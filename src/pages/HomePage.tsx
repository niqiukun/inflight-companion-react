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
  IonSlides
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FoodInfo, FOOD_TYPES } from "../text/food";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  showLanguageAlert: boolean;
  showDiningAlert: boolean;
  foodDisplayed: FoodInfo;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      showLanguageAlert: false,
      showDiningAlert: false,
      foodDisplayed: FOOD_TYPES[0].FoodList[0]
    };
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
        url: "/"
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
        url: "/"
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
    if (localStorage.getItem("order-placed")) {
      this.setState({ showDiningAlert: true });
    } else {
      this.props.history.push("/simple-dining");
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
          <div className="flight-code-label">SQ825 | 50A</div>
          <div className="continue-slide-label">
            {"<<< " + this.state.localization.SLIDE_TO_CONTINUE}
          </div>
        </div>
      </div>
    );
  }

  private renderFlightInfo(): JSX.Element {
    return (
      <div className="home-page-slide">
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
          {/*<h4>Flight Information</h4>*/}
          {/*<IonGrid>*/}
          {/*  <IonRow>*/}
          {/*    <IonCol size="6">*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.TIME_TO_DESTINATION}*/}
          {/*      </div>*/}
          {/*      <div className="text-normal time-label">*/}
          {/*        <IonIcon class="time-label-icon" name="airplane" />*/}
          {/*        02:00*/}
          {/*      </div>*/}
          {/*    </IonCol>*/}
          {/*    <IonCol size="6">*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.ESTIMATED_ARRIVAL_TIME}*/}
          {/*      </div>*/}
          {/*      <div className="text-normal time-label">*/}
          {/*        <IonIcon class="time-label-icon" name="md-time" />*/}
          {/*        05:55*/}
          {/*      </div>*/}
          {/*    </IonCol>*/}
          {/*  </IonRow>*/}
          {/*  <IonRow>*/}
          {/*    <IonCol size="6" class="destination-card">*/}
          {/*      <div className="text-large">*/}
          {/*        {this.state.localization.SINGAPORE}*/}
          {/*      </div>*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.SINGAPORE_CHANGI_AIRPORT}*/}
          {/*      </div>*/}
          {/*      <hr />*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.LOCAL_TIME}*/}
          {/*      </div>*/}
          {/*      <div className="text-normal">*/}
          {/*        {new Date().toLocaleTimeString("en-SG", {*/}
          {/*          hour12: false,*/}
          {/*          hour: "2-digit",*/}
          {/*          minute: "2-digit"*/}
          {/*        })}*/}
          {/*      </div>*/}
          {/*    </IonCol>*/}
          {/*    <IonCol size="6" class="destination-card">*/}
          {/*      <div className="text-large">*/}
          {/*        {this.state.localization.SHANGHAI}*/}
          {/*      </div>*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.SHANGHAI_PUDONG_INTL_AIRPORT}*/}
          {/*      </div>*/}
          {/*      <hr />*/}
          {/*      <div className="text-small">*/}
          {/*        {this.state.localization.LOCAL_TIME}*/}
          {/*      </div>*/}
          {/*      <div className="text-normal">*/}
          {/*        {new Date().toLocaleTimeString("en-SG", {*/}
          {/*          hour12: false,*/}
          {/*          hour: "2-digit",*/}
          {/*          minute: "2-digit"*/}
          {/*        })}*/}
          {/*      </div>*/}
          {/*    </IonCol>*/}
          {/*  </IonRow>*/}
          {/*</IonGrid>*/}
        </div>
      </div>
    );
  }

  private renderFoodSlide(): JSX.Element {
    return (
      <div
        className="home-page-slide"
        onClick={() =>
          this.props.history.push({
            pathname: "/food",
            state: { foodInfo: this.state.foodDisplayed }
          })
        }
      >
        <img
          src={this.state.foodDisplayed.imgSrc}
          alt="food with name"
          className="home-page-slide"
        />
        <div className="slide-title">
          <IonLabel className="slide-title-right">
            {this.state.localization.ORDER_NOW}
          </IonLabel>
          <IonLabel className="slide-title-left">
            {/*{this.state.foodDisplayed.foodName}*/}
            {this.state.localization.SEAFOOD_DORIA}
          </IonLabel>
          <IonLabel className="slide-title-left-sub">
            {/*{this.state.foodDisplayed.subtitle}*/}
            {this.state.localization.ORIENTAL_SELECTION}
          </IonLabel>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton
                onClick={() => {
                  this.setState({ showLanguageAlert: true });
                }}
              >
                {this.state.localization.LANGUAGES}
              </IonButton>
            </IonButtons>
            <IonTitle>{this.state.localization.APP_NAME}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSlides pager={true} scrollbar={false} class="home-page-slides">
            <IonSlide>{this.renderWelcomeMessage()}</IonSlide>
            <IonSlide>{this.renderFlightInfo()}</IonSlide>
            <IonSlide>{this.renderFoodSlide()}</IonSlide>
          </IonSlides>
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
          isOpen={this.state.showDiningAlert}
          onDidDismiss={() => this.setState({ showDiningAlert: false })}
          header="Update Order"
          message={
            "<p>You have already placed the following order:</p><p>Meal: " +
            localStorage.getItem("meal") +
            " selection<br />Beverage: " +
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
      </>
    );
  }
}

export default HomePage;
