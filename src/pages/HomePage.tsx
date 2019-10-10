import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonSlide,
  IonSlides,
  IonToast,
  useIonViewWillEnter
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FOOD_TYPES } from "../text/food";
import { GetAllOrders } from "./OrderPage";
import { customerLogin } from "../network/Customer";
import networkTest from "../network/NetworkTest";

const HomePage: React.FunctionComponent<RouteComponentProps<{}>> = (
  props: RouteComponentProps<{}>
) => {
  let localLanguageString = localStorage.getItem("language") || "EN";
  let localLanguage = LOCALIZATION[localLanguageString as LanguageType];

  if (window.location.href.indexOf("=") !== -1) {
    let key = window.location.href.slice(window.location.href.indexOf("=") + 1);
    let number1 = /[A-Z]/.test(key.charAt(0))
      ? key.charCodeAt(0) - 65
      : key.charCodeAt(0) - 22;
    let number2 = /[A-Z]/.test(key.charAt(1))
      ? key.charCodeAt(1) - 65
      : key.charCodeAt(1) - 22;
    let flightCode = number1 * 28 + number2;
    let number3 = /[A-Z]/.test(key.charAt(2))
      ? key.charCodeAt(2) - 65
      : key.charCodeAt(2) - 22;
    let number4 = /[A-Z]/.test(key.charAt(3))
      ? key.charCodeAt(3) - 65
      : key.charCodeAt(3) - 22;
    let rowNumber = Math.floor((number3 * 28 + number4) / 10);
    let seatCode = String.fromCharCode(((number3 * 28 + number4) % 10) + 65);
    if (seatCode === "I") {
      seatCode = "J";
    } else if (seatCode === "J") {
      seatCode = "K";
    }
    let seatNumber = rowNumber + seatCode;
    localStorage.setItem("flight_code", flightCode.toString());
    localStorage.setItem("seat_number", seatNumber);
    // customerLogin(seatNumber, "")
    //   .then(msg => console.log(msg))
    //   .catch(msg => console.error(msg));
  }

  //NETWORK TEST
  networkTest();

  const [localization, setLocalization] = useState<Record<string, string>>(
    localLanguage
  );
  const [showLanguageAlert, setShowLanguageAlert] = useState(false);
  const [showDiningAlert, setShowDiningAlert] = useState(false);
  const [foodDisplayed, setFoodDisplayed] = useState(FOOD_TYPES[0].FoodList[0]);
  const [orders, setOrders] = useState(GetAllOrders());
  const [diningModeIsA] = useState(localStorage.getItem("dining_mode") !== "B");
  const [meal, setMeal] = useState(localStorage.getItem("meal"));
  const [flightCode] = useState(
    localStorage.getItem("flight_code") || "invalid"
  );
  const [seatNumber] = useState(
    localStorage.getItem("seat_number") || "invalid"
  );
  const [showFlightStageAlert, setShowFlightStageAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [flightStage] = useState(
    localStorage.getItem("flight_stage") || "After Boarding"
  );
  const [showRatingAlert, setShowRatingAlert] = useState(false);

  const hasOrder = () => {
    return orders.length > 0 || meal !== null;
  };

  const getFoodDisplayed = () => {
    let myorders = GetAllOrders();
    if (myorders.length > 0) {
      setOrders(myorders);
      setFoodDisplayed(myorders[0].foodInfo);
      return;
    }
    let recommended: string[] = JSON.parse(
      localStorage.getItem("Recommended") || "[]"
    );
    if (recommended.length > 0) {
      let foodInfoFound = recommended
        .map(x =>
          FOOD_TYPES.flatMap(y => y.FoodList).find(z => z.foodName === x)
        )
        .filter(x => x !== undefined);
      if (foodInfoFound.length > 0) {
        setFoodDisplayed(foodInfoFound[0] || FOOD_TYPES[0].FoodList[0]);
      }
    }
  };

  useEffect(() => {
    getFoodDisplayed();
    if (flightCode !== "825") {
      window.location.href = "/welcome";
    }
  }, [flightCode]);

  useEffect(() => {
    if ((orders.length > 0 || meal !== null) && flightStage !== "After Meal") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const slides: any = document.getElementById("slides");
      slides.slideTo(flightStage === "After Boarding" ? 2 : 1);
    }
  }, [orders, meal, flightStage]);

  useIonViewWillEnter(() => {
    getFoodDisplayed();
    setMeal(localStorage.getItem("meal"));
  });

  const handleDiningClick = () => {
    if (localStorage.getItem("dining_mode") !== "B") {
      if (flightStage === "After Meal") {
        setShowRatingAlert(true);
      } else if (localStorage.getItem("order-placed")) {
        setShowDiningAlert(true);
      } else {
        props.history.push("/simple-dining");
      }
    } else {
      props.history.push("/dining");
    }
  };

  const renderServiceList = () => {
    const serviceListData = [
      {
        labelText: "DINING",
        iconName: "restaurant",
        url: "/",
        onClick: handleDiningClick
      },
      {
        labelText: "BEVERAGES",
        iconName: "wine",
        url: "/beverage"
      },
      {
        labelText: "KRIS_WORLD",
        iconName: "tv",
        url: "/krisworld"
      },
      {
        labelText: "KRIS_SHOP",
        iconName: "cart",
        url: "/krisshop"
      },
      {
        labelText: "SEAT_UPGRADE",
        iconName: "md-arrow-round-up",
        url: "/"
      },
      {
        labelText: "CABIN_SERVICE",
        iconName: "md-happy",
        url: "/service"
      },
      {
        labelText: "FEEDBACK",
        iconName: "chatbubbles",
        url: "/feedback"
      }
    ];
    return serviceListData.map(service => (
      <IonItem
        key={service.labelText}
        onClick={() =>
          service.onClick ? service.onClick() : props.history.push(service.url)
        }
      >
        <IonLabel>{localization[service.labelText]}</IonLabel>
        <IonIcon class="arrow-forward-icon" slot="end" name="arrow-forward" />
        <IonIcon class="list-icon" slot="start" name={service.iconName} />
      </IonItem>
    ));
  };

  const renderWelcomeMessage = () => {
    return (
      <div className="home-page-slide">
        <img
          src="assets/img/welcome.jpg"
          alt="shanghai"
          className="home-page-slide"
        />
        <div className="slide-content" style={{ padding: "36px 0" }}>
          <h1>{localization.WELCOME_ABOARD}</h1>
          <div className="flight-code-label">
            SQ{flightCode} | {seatNumber}
          </div>
          <div className="continue-slide-label">
            {localization.SLIDE_TO_CONTINUE + " >>>"}
          </div>
        </div>
      </div>
    );
  };

  const renderFlightInfo = () => {
    return (
      <div
        className="home-page-slide"
        onClick={() => {
          props.history.push("/flight-info");
        }}
      >
        <img
          src="assets/img/destinations/shanghai.jpg"
          alt="shanghai"
          className="home-page-slide"
        />
        <div className="slide-title">
          <IonLabel className="slide-title-right">
            {localization.FLIGHT_INFO}
          </IonLabel>
          <IonLabel className="slide-title-left">
            {localization.SINGAPORE} {localization.TO} {localization.SHANGHAI}
          </IonLabel>
          <IonLabel className="slide-title-left-sub">
            {localization.ARRIVAL_IN_TIME}
          </IonLabel>
        </div>
      </div>
    );
  };

  const renderMovieSlide = () => {
    return (
      <div
        className="home-page-slide"
        onClick={() => {
          props.history.push("/krisworld");
        }}
      >
        <img
          src="assets/img/movie.jpg"
          alt="movie"
          className="home-page-slide"
        />
        <div className="slide-title">
          <IonLabel className="slide-title-right">KrisWorld</IonLabel>
          <IonLabel className="slide-title-left">
            {localization.ALADDIN}
          </IonLabel>
          <IonLabel className="slide-title-left-sub">
            {localization.RECOMMENDED_FOR_YOU}
          </IonLabel>
        </div>
      </div>
    );
  };

  const renderShopSlide = () => {
    return (
      <div
        className="home-page-slide"
        onClick={() => {
          props.history.push("/krisshop");
        }}
      >
        <img
          src="assets/img/krisshop.jpg"
          alt="movie"
          className="home-page-slide"
        />
        <div className="slide-title">
          <IonLabel className="slide-title-right">KrisShop</IonLabel>
          <IonLabel className="slide-title-left">SilkAir Hello Kitty</IonLabel>
          <IonLabel className="slide-title-left-sub">SGD 39.00</IonLabel>
        </div>
      </div>
    );
  };

  const renderFoodSlide = () => {
    return diningModeIsA ? (
      <div
        className="home-page-slide"
        onClick={() => {
          if (meal !== null) {
            setShowDiningAlert(true);
          } else {
            props.history.push("/simple-dining");
          }
        }}
      >
        <img
          src={
            meal === "International"
              ? "/assets/img/meals/grilled_beef.jpg"
              : "/assets/img/meals/chicken_rice.jpg"
          }
          alt="food with name"
          className="home-page-slide"
        />
        {meal !== null ? (
          <div className="slide-title">
            <IonLabel className="slide-title-right">Update Order</IonLabel>
            <IonLabel className="slide-title-left-sub ion-text-nowrap">
              Serving soon
            </IonLabel>
            <IonLabel className="slide-title-left">
              {meal === "International"
                ? "Grilled Beef Tenderloin"
                : "Chicken Rice"}
            </IonLabel>
          </div>
        ) : (
          <div className="slide-title">
            <IonLabel className="slide-title-right">
              {localization.ORDER_NOW}
            </IonLabel>
            <IonLabel className="slide-title-left">
              {localization.CHICKEN_RICE}
            </IonLabel>
            <IonLabel className="slide-title-left-sub">
              {localization.ORIENTAL_SELECTION}
            </IonLabel>
          </div>
        )}
      </div>
    ) : (
      <div
        className="home-page-slide"
        onClick={() => {
          if (orders.length > 0) {
            props.history.push("/orders");
          } else {
            props.history.push("/dining");
          }
        }}
      >
        <img
          src={foodDisplayed.imgSrc}
          alt="food with name"
          className="home-page-slide"
        />
        {orders.length > 0 ? (
          <div className="slide-title">
            <IonLabel className="slide-title-right">My Orders</IonLabel>
            <IonLabel className="slide-title-left-sub ion-text-nowrap">
              {flightStage !== "After Meal" ? "Serving soon" : "Served"}
            </IonLabel>
            <IonLabel className="slide-title-left">
              {orders[0].foodInfo.foodName}
            </IonLabel>
          </div>
        ) : (
          <div className="slide-title">
            <IonLabel className="slide-title-right">
              {localization.ORDER_NOW}
            </IonLabel>
            <IonLabel className="slide-title-left">
              {localization.CHICKEN_RICE}
            </IonLabel>
            <IonLabel className="slide-title-left-sub">
              {localization.ORIENTAL_SELECTION}
            </IonLabel>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setShowLanguageAlert(true);
              }}
            >
              {localization.LANGUAGES}
            </IonButton>
          </IonButtons>
          <IonTitle onClick={() => setShowFlightStageAlert(true)}>
            {localization.APP_NAME}
          </IonTitle>
          {/*<IonButtons slot="start">*/}
          {/*  <IonButton onClick={() => setShowFlightStageAlert(true)}>*/}
          {/*    <IonIcon name="more" />*/}
          {/*  </IonButton>*/}
          {/*</IonButtons>*/}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="home-page-slides">
          <IonSlides
            pager={true}
            scrollbar={false}
            class="home-page-slides"
            id="slides"
          >
            {flightStage === "After Boarding" && (
              <IonSlide class="home-page-slide">
                {renderWelcomeMessage()}
              </IonSlide>
            )}
            <IonSlide class="home-page-slide">{renderFlightInfo()}</IonSlide>
            {(!diningModeIsA || flightStage !== "After Meal") && (
              <IonSlide class="home-page-slide">{renderFoodSlide()}</IonSlide>
            )}
            <IonSlide class="home-page-slide">{renderMovieSlide()}</IonSlide>
            <IonSlide class="home-page-slide">{renderShopSlide()}</IonSlide>
          </IonSlides>
        </div>
        {/* Start of Service List */}
        <IonListHeader>{localization.INFLIGHT_SERVICES}</IonListHeader>
        <IonList id="service-list">{renderServiceList()}</IonList>
      </IonContent>
      <IonAlert
        isOpen={showLanguageAlert}
        onDidDismiss={() => setShowLanguageAlert(false)}
        header={localization.LANGUAGES}
        message={localization.CHOOSE_LANGUAGE_ALERT}
        buttons={[
          {
            text: "English",
            handler: () => {
              setLocalization(LOCALIZATION.EN);
              localStorage.setItem("language", "EN");
            }
          },
          {
            text: "简体中文",
            handler: () => {
              setLocalization(LOCALIZATION.ZH_CN);
              localStorage.setItem("language", "ZH_CN");
            }
          },
          {
            text: localization.CANCEL,
            role: "cancel",
            cssClass: "secondary"
          }
        ]}
      />
      <IonAlert
        isOpen={showFlightStageAlert}
        onDidDismiss={() => setShowFlightStageAlert(false)}
        header="Select Flight Stage"
        message={
          "This feature is for demo purpose only<br />Current stage: " +
          flightStage
        }
        buttons={[
          {
            text: "After Boarding",
            handler: () => {
              localStorage.setItem("flight_stage", "After Boarding");
              window.location.href = "/home";
            }
          },
          {
            text: "Before Meal",
            handler: () => {
              localStorage.setItem("flight_stage", "Before Meal");
              window.location.href = "/home";
            }
          },
          {
            text: "After Meal",
            handler: () => {
              if (hasOrder()) {
                localStorage.setItem("flight_stage", "After Meal");
                window.location.href = "/home";
              } else {
                setShowToast(true);
              }
            }
          },
          {
            text: localization.CANCEL,
            role: "cancel",
            cssClass: "secondary"
          }
        ]}
      />
      <IonAlert
        isOpen={showDiningAlert}
        onDidDismiss={() => setShowDiningAlert(false)}
        header="Update Order"
        message={
          "<p>You have already placed the following order:</p><p>Meal: " +
          localStorage.getItem("meal") +
          " Selection<br />Beverage: " +
          localStorage.getItem("beverage") +
          "</p><p>Would you like to update your order?</p>"
        }
        buttons={[
          {
            text: localization.CANCEL,
            role: "cancel",
            cssClass: "secondary"
          },
          {
            text: "Update",
            handler: () => {
              props.history.push("/simple-dining");
            }
          }
        ]}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        duration={2000}
        message="Please make an order before proceeding"
      />
      <IonAlert
        isOpen={showRatingAlert}
        onDidDismiss={() => setShowRatingAlert(false)}
        header={"Dining"}
        message={
          "Meals are currently not available. <br />" +
          "To help us serve you better, please provide feedback on our service."
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary"
          },
          {
            text: "Feedback",
            handler: () => {
              props.history.push("/feedback", { category: "Dining" });
            }
          }
        ]}
      />
    </>
  );
};

export default HomePage;
