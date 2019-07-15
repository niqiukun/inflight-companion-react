import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonHeader,
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
  IonCardContent,
  IonBackButton
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { JSXElement } from "@babel/types";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  fullscreen: boolean;
}

class DiningPage extends React.Component<Props, State> {
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
          <IonCard
            class="fullscreen-card"
            onClick={() =>
              this.props.history.push({
                pathname: "/food",
                state: { foodName: "Set A" }
              })
            }
          >
            <img
              src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
              alt="jsx-a11y/alt-text"
            />
            <IonCardHeader>
              <IonCardTitle>Choice</IonCardTitle>
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
              <IonCardSubtitle>Shanghai</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Shanghai is a city.</IonCardContent>
          </IonCard>
        </IonSlide>
      </IonSlides>
    );
  }

  private renderDetailedMenu(): JSX.Element {
    return (
      <IonGrid>
        <IonRow class="align-items-center">
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
        <IonRow class="align-items-center">
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
        <IonRow class="align-items-center">
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
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle
              onClick={() =>
                this.setState(prevState => ({
                  fullscreen: !prevState.fullscreen
                }))
              }
            >
              {this.state.localization.DINING}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderMenu()}</IonContent>
      </>
    );
  }
}

export default DiningPage;


private renderBackup(): JSX.Element {
  const choiceList = [
    {
      foodName: "CHICKEN_RICE",
      subtitle: "SET_A",
      imgSrc: "https://ionicframework.com/docs/demos/api/card/madison.jpg",
      description: "CHICKEN_RICE_DESCRIPTION"
    },
    {
      foodName: "BEEF_NOODLES",
      subtitle: "SET_B",
      imgSrc: "https://ionicframework.com/docs/demos/api/card/madison.jpg",
      description: "BEEF_NOODLES_DESCRIPTION"
    }
  ];
  return (
    <IonSlides pager={false} scrollbar={true} class="fullscreen-slides">
      {choiceList.map(choice => (
        <IonSlide key={this.state.localization[choice.foodName]}>
          <IonCard
            class="fullscreen-card"
            onClick={() =>
              this.props.history.push({
                pathname: "/food",
                state: {
                  foodName: this.state.localization[choice.foodName],
                  subtitle: this.state.localization[choice.subtitle],
                  imgSrc: this.state.localization[choice.imgSrc],
                  description: this.state.localization[choice.description]
                }
              })
            }
          >
            <img src={choice.imgSrc} alt="jsx-a11y/alt-text" />
            <IonCardHeader>
              <IonCardTitle>
                {this.state.localization[choice.foodName]}
              </IonCardTitle>
              <IonCardSubtitle>
                {this.state.localization[choice.subtitle]}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {this.state.localization[choice.description]}
            </IonCardContent>
          </IonCard>
        </IonSlide>
      ))}
    </IonSlides>
  );
}

