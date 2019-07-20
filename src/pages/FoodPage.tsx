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
  IonLabel
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  toolbarOpacity: number;
}

class FoodPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      toolbarOpacity: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event: CustomEvent) {
    this.setState({ toolbarOpacity: (event.detail.currentY - 60) / 80 });
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
              <IonLabel className="food-page-card">
                {this.props.location.state.foodInfo.description}
              </IonLabel>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </>
    );
  }
}

export default FoodPage;
