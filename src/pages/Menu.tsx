import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonSlide,
  IonContent,
  IonSlides,
  IonGrid,
  IonCol,
  IonLabel,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  fullscreen: boolean;
}

class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      fullscreen: true
    };
  }

  private renderMenu(): JSX.Element {
    if (this.state.fullscreen) {
      return this.renderFullscreenMenu();
    } else {
      return this.renderDetailedMenu();
    }
  }

  private renderFullscreenMenu(): JSX.Element {
    return (
      <IonSlides pager={false} scrollbar={true} class="fullscreen-slides">
        <IonSlide>
          <IonCard class="fullscreen-card">
            <img
              src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
              alt="jsx-a11y/alt-text"
            />
            <IonCardHeader>
              <IonCardTitle>Destination</IonCardTitle>
              <IonCardSubtitle>Singapore</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Singapore is a city state.</IonCardContent>
          </IonCard>
        </IonSlide>
        <IonSlide>
          <IonCard class="fullscreen-card">
            <img
              src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
              alt="jsx-a11y/alt-text"
            />
            <IonCardHeader>
              <IonCardTitle>Destination</IonCardTitle>
              <IonCardSubtitle>Singapore</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Singapore is a city state.</IonCardContent>
          </IonCard>
        </IonSlide>
      </IonSlides>
    );
  }

  private renderDetailedMenu(): JSX.Element {
    return (
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonIcon
                class="arrow-back-icon"
                name="arrow-back"
                size="large"
                onClick={() =>
                  this.props.history.action === "POP"
                    ? this.props.history.push("/home")
                    : this.props.history.goBack()
                }
              />
            </IonButtons>
            <IonTitle
              onClick={() =>
                this.setState(prevState => ({
                  fullscreen: !prevState.fullscreen
                }))
              }
            >
              {this.state.localization.APP_NAME}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderMenu()}</IonContent>
      </>
    );
  }
}

export default Menu;
