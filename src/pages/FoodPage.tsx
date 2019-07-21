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
  IonToast
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  toolbarOpacity: number;
  quantity: number;
  capQuantityToast: boolean;
  orderPlaced: boolean;
}

class FoodPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.handleScroll = this.handleScroll.bind(this);
    let storedQuantity = localStorage.getItem(
      this.props.location.state.foodInfo.foodName
    );

    let orderPlaced = storedQuantity != null || storedQuantity == 0;

    this.state = {
      localization: localLanguage,
      toolbarOpacity: 0,
      quantity: +(storedQuantity || 0),
      capQuantityToast: false,
      orderPlaced: orderPlaced
    };
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
              {this.props.location.state.foodInfo.foodName}
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
            src={this.props.location.state.foodInfo.imgSrc}
          />
          <IonCard className="food-page-card">
            <IonCardHeader className="food-page-card">
              <IonCardTitle className="food-page-title">
                {this.props.location.state.foodInfo.foodName}
              </IonCardTitle>
              <IonCardSubtitle className="food-page-subtitle">
                {this.props.location.state.foodInfo.subtitle}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="food-page-card">
              {this.props.location.state.foodInfo.shortDescription}
              Content:
              <br />
              {this.props.location.state.foodInfo.description}
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
                      onClick={() => {
                        localStorage.setItem(
                          this.props.location.state.foodInfo.foodName,
                          this.state.quantity.toString()
                        );
                        this.setState({
                          orderPlaced: this.state.quantity != 0
                        });
                      }}
                    >
                      {this.state.orderPlaced ? "Update" : "Confirm"}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonToast
          isOpen={this.state.capQuantityToast}
          onDidDismiss={() => this.dismissCapQuantityToast()}
          message="Each passanger can only order maximum of 3"
          duration={2000}
        />
      </>
    );
  }
}

export default FoodPage;
