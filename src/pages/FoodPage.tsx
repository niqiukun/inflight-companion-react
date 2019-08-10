import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLabel,
  IonRow,
  IonIcon,
  IonGrid,
  IonButton,
  IonCol,
  IonToast,
  IonFooter
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FoodInfo } from "../text/food";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  toolbarOpacity: number;
  quantity: number;
  capQuantityToast: boolean;
  orderPlaced: boolean;
}

class FoodPage extends React.Component<Props, State> {
  private foodInfo: FoodInfo;
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];
    this.foodInfo = this.props.location.state.foodInfo as FoodInfo;

    this.handleScroll = this.handleScroll.bind(this);
    let storedQuantity = localStorage.getItem(this.foodInfo.foodName);

    let orderPlaced = storedQuantity != null || storedQuantity === "0";

    this.state = {
      localization: localLanguage,
      toolbarOpacity: 0,
      quantity: +(storedQuantity || 0),
      capQuantityToast: false,
      orderPlaced: orderPlaced
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.history.location.state) {
      this.foodInfo = nextProps.history.location.state.foodInfo;
      let storedQuantity = localStorage.getItem(this.foodInfo.foodName);
      let orderPlaced = storedQuantity != null || storedQuantity === "0";
      this.setState({
        quantity: +(storedQuantity || 0),
        orderPlaced: orderPlaced
      });
    }
  }

  handleScroll(event: CustomEvent) {
    this.setState({ toolbarOpacity: (event.detail.currentY - 60) / 80 });
  }

  showCapQuantityToast() {
    this.setState({ capQuantityToast: true });
  }

  dismissCapQuantityToast() {
    this.setState({ capQuantityToast: false });
  }

  addRecommended(foodInfo: FoodInfo) {
    let recommended: Set<string>;
    let recommendedString = localStorage.getItem("Recommended");
    if (recommendedString != null) {
      recommended = new Set<string>(JSON.parse(recommendedString));
    } else {
      recommended = new Set<string>();
    }
    recommended.add(foodInfo.foodName);
    localStorage.setItem(
      "Recommended",
      JSON.stringify(Array.from(recommended))
    );
  }

  render() {
    return (
      <>
        <IonHeader className="food-page-header">
          <IonToolbar
            style={{
              "--background":
                "rgba(255, 255, 255, " +
                this.state.toolbarOpacity.toString() +
                ")",
              "--border-color": "rgba(0, 0, 0, 0)"
            }}
          >
            <IonButtons slot="start">
              <IonBackButton defaultHref="/dining" />
            </IonButtons>
            <IonTitle
              style={{
                color:
                  "rgba(102, 102, 102, " +
                  this.state.toolbarOpacity.toString() +
                  ")"
              }}
            >
              {this.foodInfo.foodName}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          scrollEvents={true}
          onIonScroll={this.handleScroll}
        >
          <img
            id="food-main-img"
            className="food-page-img"
            alt="food"
            src={this.foodInfo.imgSrc}
          />
          <IonCard className="food-page-card">
            <IonCardHeader className="food-page-card">
              <IonCardTitle className="food-page-title">
                {this.foodInfo.foodName}
              </IonCardTitle>
              <IonCardSubtitle className="food-page-subtitle">
                {this.foodInfo.subtitle}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="food-page-card">
              {this.foodInfo.shortDescription}
              Content:
              <br />
              {this.foodInfo.description}
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonGrid className="food-page-quantity-grid">
              <IonRow align-items-center>
                <IonCol size="2">
                  <IonButton
                    size="small"
                    className="food-page-select-button"
                    fill="outline"
                    onClick={() => {
                      if (this.state.quantity > 0) {
                        this.setState(state => ({
                          quantity: state.quantity - 1
                        }));
                      }
                    }}
                  >
                    <IonIcon name="remove" size="large"></IonIcon>
                  </IonButton>
                </IonCol>
                <IonCol size="3" text-center>
                  <IonLabel>{this.state.quantity}</IonLabel>
                </IonCol>
                <IonCol size="2">
                  <IonButton
                    size="small"
                    className="food-page-select-button"
                    fill="outline"
                    onClick={() => {
                      if (this.state.quantity >= 3) {
                        this.showCapQuantityToast();
                      } else {
                        this.setState(state => ({
                          quantity: state.quantity + 1
                        }));
                      }
                    }}
                  >
                    <IonIcon name="add" size="large"></IonIcon>
                  </IonButton>
                </IonCol>
                <IonCol size="4" offset="1">
                  <IonButton
                    size="small"
                    className="food-page-confirm"
                    onClick={() => {
                      localStorage.setItem(
                        this.foodInfo.foodName,
                        this.state.quantity.toString()
                      );
                      if (this.state.quantity !== 0) {
                        this.addRecommended(this.foodInfo);
                      }
                      this.setState({
                        orderPlaced: this.state.quantity !== 0
                      });
                      this.props.history.push("/orders");
                    }}
                  >
                    {this.state.orderPlaced ? "Update" : "Confirm"}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonFooter>
        <IonToast
          isOpen={this.state.capQuantityToast}
          onDidDismiss={() => this.dismissCapQuantityToast()}
          message="Each passenger can only order maximum of 3"
          duration={2000}
        />
      </>
    );
  }
}

export default FoodPage;
