import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonAlert,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSlide,
  IonContent,
  IonSlides,
  IonCardHeader,
  IonCard,
  IonBackButton,
  IonListHeader,
  IonButton,
  IonModal,
  IonFooter,
  IonItem,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonList
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { BEVERAGES } from "../text/beverages";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  showModal1: boolean;
  showModal2: boolean;
  mealSelected?: string;
  drinkSelected?: string;
  showAlert: boolean;
}

class SimpleDiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      showModal1: false,
      showModal2: false,
      showAlert: false
    };
  }

  componentWillMount(): void {
    this.setState({
      mealSelected: localStorage.getItem("meal") || undefined,
      drinkSelected: localStorage.getItem("beverage") || undefined
    });
  }

  placeOrder(): void {
    this.state.mealSelected &&
      localStorage.setItem("meal", this.state.mealSelected);
    this.state.drinkSelected &&
      localStorage.setItem("beverage", this.state.drinkSelected);
    localStorage.setItem("order-placed", "true");
    // TODO: Place meal order with server
    this.setState({ showAlert: true });
    this.props.history.push("/home");
  }

  private renderMenu(): JSX.Element {
    return (
      <>
        <IonListHeader>Meals</IonListHeader>
        <IonSlides pager={true} scrollbar={false} class="fullscreen-slides">
          <IonSlide>
            <IonCard class="fullscreen-card">
              <img
                src="/assets/img/meals/western.jpg"
                alt="western"
                className="menu-img"
              />
              <IonCardHeader class="menu-card-header">
                <div className="menu-header">International selection</div>
                <div className="menu-dishname">
                  Grilled beef fillet with balsamic onion sauce
                </div>
                <div className="menu-dish-description">
                  Grilled beef with asparagus, baby spinach, crushed potato, and
                  served with balsamic onion sauce.
                </div>
                <IonGrid class="menu-btns">
                  <IonRow>
                    <IonCol>
                      <IonButton
                        size="small"
                        class="menu-btn"
                        fill="outline"
                        onClick={() => this.setState({ showModal1: true })}
                      >
                        Full menu
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton
                        size="small"
                        class="menu-btn"
                        fill={
                          this.state.mealSelected === "international"
                            ? "solid"
                            : "outline"
                        }
                        onClick={() =>
                          this.setState({ mealSelected: "international" })
                        }
                      >
                        {this.state.mealSelected === "international"
                          ? "Selected"
                          : "Select"}
                        {this.state.mealSelected === "international" && (
                          <IonIcon class="ion-btn-icon" name="md-checkmark" />
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonModal
                  isOpen={this.state.showModal1}
                  onDidDismiss={() => this.setState({ showModal1: false })}
                  cssClass="menu-modal"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Full Menu</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => this.setState({ showModal1: false })}
                        >
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <div className="full-menu">
                    <div className="menu-header">International selection</div>
                    <div className="menu-subheader">appetiser</div>
                    <div className="menu-text">
                      Apple and celery salad with smoked salmon
                    </div>
                    <div className="menu-subheader">main course</div>
                    <div className="menu-text">
                      Grilled beef fillet with balsamic onion sauce
                    </div>
                    <div className="menu-subheader">dessert</div>
                    <div className="menu-text">
                      Sweet potato and orange cake
                    </div>
                    <div className="menu-subheader">from the bakery</div>
                    <div className="menu-text">Roll and butter</div>
                    <div className="menu-subheader">hot beverages</div>
                    <div className="menu-text">Coffee - Tea</div>
                  </div>
                </IonModal>
              </IonCardHeader>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard class="fullscreen-card">
              <img
                src="/assets/img/meals/chinese.jpg"
                alt="chinese"
                className="menu-img"
              />
              <IonCardHeader class="menu-card-header">
                <div className="menu-header">Oriental selection</div>
                <div className="menu-dishname">
                  Seafood doria with saffron rice
                </div>
                <div className="menu-dish-description">
                  Japanese style mixed seafood ragout on saffron rice with yuzu
                  pepper cream sauce and parmesan.
                </div>
                <IonGrid class="menu-btns">
                  <IonRow>
                    <IonCol>
                      <IonButton
                        size="small"
                        class="menu-btn"
                        fill="outline"
                        onClick={() => this.setState({ showModal2: true })}
                      >
                        Full menu
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton
                        size="small"
                        class="menu-btn"
                        fill={
                          this.state.mealSelected === "oriental"
                            ? "solid"
                            : "outline"
                        }
                        onClick={() =>
                          this.setState({ mealSelected: "oriental" })
                        }
                      >
                        {this.state.mealSelected === "oriental"
                          ? "Selected"
                          : "Select"}
                        {this.state.mealSelected === "oriental" && (
                          <IonIcon class="ion-btn-icon" name="md-checkmark" />
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonModal
                  isOpen={this.state.showModal2}
                  onDidDismiss={() => this.setState({ showModal2: false })}
                  cssClass="menu-modal"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Full Menu</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => this.setState({ showModal2: false })}
                        >
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <div className="full-menu">
                    <div className="menu-header">Oriental selection</div>
                    <div className="menu-subheader">appetiser</div>
                    <div className="menu-text">
                      Zensai - Selection of Japanese appetiser
                    </div>
                    <div className="menu-subheader">noodles</div>
                    <div className="menu-text">Japanese cold noodles</div>
                    <div className="menu-subheader">main course</div>
                    <div className="menu-text">
                      Seafood doria with saffron rice
                    </div>
                    <div className="menu-subheader">dessert</div>
                    <div className="menu-text">
                      Sweet potato and orange cake
                    </div>
                    <div className="menu-subheader">from the bakery</div>
                    <div className="menu-text">Roll and butter</div>
                    <div className="menu-subheader">hot beverage</div>
                    <div className="menu-text">Green tea</div>
                    <div className="menu-subheader">cold beverage</div>
                    <div className="menu-text">Japanese Oolong tea</div>
                  </div>
                </IonModal>
              </IonCardHeader>
            </IonCard>
          </IonSlide>
        </IonSlides>
        <IonList>
          <IonListHeader>Beverages</IonListHeader>
          <IonItem lines="none" class="menu-list-item">
            <IonLabel>
              {this.state.mealSelected
                ? "Choose your beverage"
                : "Choose your meal first"}
            </IonLabel>
            {this.state.mealSelected && (
              <IonSelect
                interfaceOptions={{
                  header: "Select Beverage"
                }}
                interface="alert"
                multiple={false}
                placeholder="Select One"
                onIonChange={(e: CustomEvent) =>
                  this.setState({ drinkSelected: e.detail.value })
                }
                value={this.state.drinkSelected}
              >
                {Object.keys(BEVERAGES).map(key => {
                  return (
                    <>
                      <IonSelectOption
                        key={key}
                        value={key.toLowerCase()}
                        disabled={true}
                      >
                        {key}
                      </IonSelectOption>
                      {BEVERAGES[key].map(value => {
                        return (
                          <IonSelectOption
                            key={key + value}
                            value={value.toLowerCase()}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;{value}
                          </IonSelectOption>
                        );
                      })}
                    </>
                  );
                })}
              </IonSelect>
            )}
          </IonItem>
        </IonList>
      </>
    );
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle
              onClick={() => {
                window.location.href = "/dining";
              }}
            >
              {this.state.localization.DINING}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderMenu()}</IonContent>
        <IonFooter>
          <IonToolbar>
            <div className="cart-labels">
              <div>
                Meal:{" "}
                {this.state.mealSelected
                  ? this.state.mealSelected + " selection"
                  : "not selected"}
              </div>
              <div>Beverage: {this.state.drinkSelected || "not selected"}</div>
            </div>
            <IonButton
              slot="end"
              disabled={!this.state.mealSelected || !this.state.drinkSelected}
              className="order-btn"
              onClick={() => this.placeOrder()}
            >
              {localStorage.getItem("order-placed")
                ? "Update Order"
                : "Place Order"}
            </IonButton>
          </IonToolbar>
        </IonFooter>
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setState({ showAlert: false })}
          header="Order Placed"
          message="Your order has been placed.<br />We will serve the meal to you shortly."
          buttons={["OK"]}
        />
      </>
    );
  }
}

export default SimpleDiningPage;
