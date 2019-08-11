import React from "react";
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
  IonToast
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FoodInfo, FOOD_TYPES } from "../text/food";
import { Order, GetAllOrders } from "./OrderPage";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  showLanguageAlert: boolean;
  showDiningAlert: boolean;
  foodDisplayed: FoodInfo;
  orders: Order[];
  diningModeIsA: boolean;
  meal: string | null;
  flightCode: string;
  seatNumber: string;
  showFlightStageAlert: boolean;
  flightStage: string;
  showToast: boolean;
  showRatingAlert: boolean;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    if (window.location.href.indexOf("=") !== -1) {
      let key = window.location.href.slice(
        window.location.href.indexOf("=") + 1
      );
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
    }

    this.state = {
      localization: localLanguage,
      showLanguageAlert: false,
      showDiningAlert: false,
      foodDisplayed: FOOD_TYPES[0].FoodList[0],
      orders: GetAllOrders(),
      diningModeIsA: localStorage.getItem("dining_mode") !== "B",
      meal: localStorage.getItem("meal"),
      flightCode: localStorage.getItem("flight_code") || "invalid",
      seatNumber: localStorage.getItem("seat_number") || "invalid",
      showFlightStageAlert: false,
      flightStage: localStorage.getItem("flight_stage") || "After Boarding",
      showToast: false,
      showRatingAlert: false
    };
  }

  hasOrder() {
    return this.state.orders.length > 0 || this.state.meal !== null;
  }

  componentDidMount() {
    // const slides: any = document.getElementById("slides");
    // if (slides) {
    //   slides.options = { loop: true };
    // }
    this.getFoodDisplayed();
    if (this.state.flightCode !== "825") {
      window.location.href = "/welcome";
    }
  }

  componentWillReceiveProps() {
    this.getFoodDisplayed();
    this.setState(
      {
        meal: localStorage.getItem("meal")
      },
      () => {
        if (this.hasOrder() && this.state.flightStage !== "After Meal") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const slides: any = document.getElementById("slides");
          slides.slideTo(this.state.flightStage === "After Boarding" ? 2 : 1);
        }
      }
    );
  }

  private renderServiceList(): JSX.Element[] {
    const serviceListData = [
      {
        labelText: "DINING",
        iconName: "restaurant",
        url: "/",
        onClick: this.handleDiningClick
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
        url: "/"
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
        url: "/"
      }
    ];
    return serviceListData.map(service => (
      <IonItem
        key={service.labelText}
        onClick={() =>
          service.onClick
            ? service.onClick()
            : this.props.history.push(service.url)
        }
      >
        <IonLabel>{this.state.localization[service.labelText]}</IonLabel>
        <IonIcon class="arrow-forward-icon" slot="end" name="arrow-forward" />
        <IonIcon class="list-icon" slot="start" name={service.iconName} />
      </IonItem>
    ));
  }

  handleDiningClick = () => {
    if (localStorage.getItem("dining_mode") !== "B") {
      if (this.state.flightStage === "After Meal") {
        this.setState({ showRatingAlert: true });
      } else if (localStorage.getItem("order-placed")) {
        this.setState({ showDiningAlert: true });
      } else {
        this.props.history.push("/simple-dining");
      }
    } else {
      this.props.history.push("/dining");
    }
  };

  private renderWelcomeMessage(): JSX.Element {
    return (
      <div className="home-page-slide">
        <img
          src="assets/img/welcome.jpg"
          alt="shanghai"
          className="home-page-slide"
        />
        <div className="slide-content" style={{ padding: "36px 0" }}>
          <h1>{this.state.localization.WELCOME_ABOARD}</h1>
          <div className="flight-code-label">
            SQ{this.state.flightCode} | {this.state.seatNumber}
          </div>
          <div className="continue-slide-label">
            {this.state.localization.SLIDE_TO_CONTINUE + " >>>"}
          </div>
        </div>
      </div>
    );
  }

  private renderFlightInfo(): JSX.Element {
    return (
      <div
        className="home-page-slide"
        onClick={() => {
          this.props.history.push("/flight-info");
        }}
      >
        <img
          src="assets/img/destinations/shanghai.jpg"
          alt="shanghai"
          className="home-page-slide"
        />
        <div className="slide-title">
          <IonLabel className="slide-title-right">
            {this.state.localization.FLIGHT_INFO}
          </IonLabel>
          <IonLabel className="slide-title-left">
            {this.state.localization.SINGAPORE} {this.state.localization.TO}{" "}
            {this.state.localization.SHANGHAI}
          </IonLabel>
          <IonLabel className="slide-title-left-sub">
            {this.state.localization.ARRIVAL_IN_TIME}
          </IonLabel>
        </div>
      </div>
    );
  }

  private renderMovieSlide(): JSX.Element {
    return (
      <div
        className="home-page-slide"
        onClick={() => {
          this.props.history.push("/krisworld");
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
            {this.state.localization.ALADDIN}
          </IonLabel>
          <IonLabel className="slide-title-left-sub">
            {this.state.localization.RECOMMENDED_FOR_YOU}
          </IonLabel>
        </div>
      </div>
    );
  }

  private getFoodDisplayed() {
    let orders = GetAllOrders();
    if (orders.length > 0) {
      this.setState({ orders: orders, foodDisplayed: orders[0].foodInfo });
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
        this.setState({
          foodDisplayed: foodInfoFound[0] || FOOD_TYPES[0].FoodList[0]
        });
      }
    }
  }

  private renderFoodSlide(): JSX.Element {
    return this.state.diningModeIsA ? (
      <div
        className="home-page-slide"
        onClick={() => {
          if (this.state.meal !== null) {
            this.setState({ showDiningAlert: true });
          } else {
            this.props.history.push("/simple-dining");
          }
        }}
      >
        <img
          src={
            this.state.meal === "International"
              ? "/assets/img/meals/grilled_beef.jpg"
              : "/assets/img/meals/chicken_rice.jpg"
          }
          alt="food with name"
          className="home-page-slide"
        />
        {this.state.meal !== null ? (
          <div className="slide-title">
            <IonLabel className="slide-title-right">Update Order</IonLabel>
            <IonLabel className="slide-title-left-sub ion-text-nowrap">
              Serving soon
            </IonLabel>
            <IonLabel className="slide-title-left">
              {this.state.meal === "International"
                ? "Grilled Beef Tenderloin"
                : "Chicken Rice"}
            </IonLabel>
          </div>
        ) : (
          <div className="slide-title">
            <IonLabel className="slide-title-right">
              {this.state.localization.ORDER_NOW}
            </IonLabel>
            <IonLabel className="slide-title-left">
              {this.state.localization.CHICKEN_RICE}
            </IonLabel>
            <IonLabel className="slide-title-left-sub">
              {this.state.localization.ORIENTAL_SELECTION}
            </IonLabel>
          </div>
        )}
      </div>
    ) : (
      <div
        className="home-page-slide"
        onClick={() => {
          if (this.state.orders.length > 0) {
            this.props.history.push("/orders");
          } else {
            this.props.history.push("/dining");
          }
        }}
      >
        <img
          src={this.state.foodDisplayed.imgSrc}
          alt="food with name"
          className="home-page-slide"
        />
        {this.state.orders.length > 0 ? (
          <div className="slide-title">
            <IonLabel className="slide-title-right">My Orders</IonLabel>
            <IonLabel className="slide-title-left-sub ion-text-nowrap">
              Serving soon
            </IonLabel>
            <IonLabel className="slide-title-left">
              {this.state.orders[0].foodInfo.foodName}
            </IonLabel>
          </div>
        ) : (
          <div className="slide-title">
            <IonLabel className="slide-title-right">
              {this.state.localization.ORDER_NOW}
            </IonLabel>
            <IonLabel className="slide-title-left">
              {this.state.localization.CHICKEN_RICE}
            </IonLabel>
            <IonLabel className="slide-title-left-sub">
              {this.state.localization.ORIENTAL_SELECTION}
            </IonLabel>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  this.setState({ showLanguageAlert: true });
                }}
              >
                {this.state.localization.LANGUAGES}
              </IonButton>
            </IonButtons>
            <IonTitle>{this.state.localization.APP_NAME}</IonTitle>
            <IonButtons slot="start">
              <IonButton
                onClick={() => this.setState({ showFlightStageAlert: true })}
              >
                <IonIcon name="more" />
              </IonButton>
            </IonButtons>
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
              {this.state.flightStage === "After Boarding" && (
                <IonSlide class="home-page-slide">
                  {this.renderWelcomeMessage()}
                </IonSlide>
              )}
              <IonSlide class="home-page-slide">
                {this.renderFlightInfo()}
              </IonSlide>
              {(!this.state.diningModeIsA ||
                this.state.flightStage !== "After Meal") && (
                <IonSlide class="home-page-slide">
                  {this.renderFoodSlide()}
                </IonSlide>
              )}
              <IonSlide class="home-page-slide">
                {this.renderMovieSlide()}
              </IonSlide>
            </IonSlides>
          </div>
          {/* Start of Service List */}
          <IonListHeader>
            {this.state.localization.INFLIGHT_SERVICES}
          </IonListHeader>
          <IonList id="service-list">{this.renderServiceList()}</IonList>
        </IonContent>
        <IonAlert
          isOpen={this.state.showLanguageAlert}
          onDidDismiss={() => this.setState({ showLanguageAlert: false })}
          header={this.state.localization.LANGUAGES}
          message={this.state.localization.CHOOSE_LANGUAGE_ALERT}
          buttons={[
            {
              text: "English",
              handler: () => {
                this.setState({ localization: LOCALIZATION.EN });
                localStorage.setItem("language", "EN");
              }
            },
            {
              text: "简体中文",
              handler: () => {
                this.setState({ localization: LOCALIZATION.ZH_CN });
                localStorage.setItem("language", "ZH_CN");
              }
            },
            {
              text: this.state.localization.CANCEL,
              role: "cancel",
              cssClass: "secondary"
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.showFlightStageAlert}
          onDidDismiss={() => this.setState({ showFlightStageAlert: false })}
          header="Select flight stage"
          message={
            "This feature is for demo purpose only<br />Current stage: " +
            this.state.flightStage
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
                if (this.hasOrder()) {
                  localStorage.setItem("flight_stage", "After Meal");
                  window.location.href = "/home";
                } else {
                  this.setState({ showToast: true });
                }
              }
            },
            {
              text: this.state.localization.CANCEL,
              role: "cancel",
              cssClass: "secondary"
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.showDiningAlert}
          onDidDismiss={() => this.setState({ showDiningAlert: false })}
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
              text: this.state.localization.CANCEL,
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Update",
              handler: () => {
                this.props.history.push("/simple-dining");
              }
            }
          ]}
        />
        <IonToast
          isOpen={this.state.showToast}
          onDidDismiss={() => this.setState({ showToast: false })}
          duration={2000}
          message="Please make an order before proceeding"
        />
        <IonAlert
          isOpen={this.state.showRatingAlert}
          onDidDismiss={() => this.setState({ showRatingAlert: false })}
          header={"Dining"}
          message={
            "Meals are currently not available. <br />For extra meals, please call our cabin service."
          }
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Feedback",
              handler: () => {}
            }
          ]}
        />
      </>
    );
  }
}

export default HomePage;
