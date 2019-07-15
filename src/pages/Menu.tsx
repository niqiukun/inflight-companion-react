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
import { LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  fullscreen: boolean;
}

class Menu extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    
    let localLanguage : Record<string, string>;
    let localLanguageString = localStorage.getItem("language");
    switch(localLanguageString){
    case "EN":
      localLanguage = LOCALIZATION.EN;
      break;
    case "ZH_CN":
      localLanguage = LOCALIZATION.ZH_CN
      break;
    default:
      localLanguage = LOCALIZATION.EN;
    }

    this.state = {
      localization: localLanguage,
      fullscreen: true
    };
  }

  private renderMenu() : JSX.Element{
    if(this.state.fullscreen){
      return this.renderFullscreenMenu();
    }else{
      return this.renderDetailedMenu();
    }
  }

  private renderFullscreenMenu() : JSX.Element{
    const fullscreenMenu = (
      <IonSlides pager={false} scrollbar={true} class="fullscreen-slides" >
        <IonSlide>
          <IonCard class="fullscreen-card">
            <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
            <IonCardHeader>
              <IonCardTitle>Destination</IonCardTitle>
              <IonCardSubtitle>Singapore</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Singapore is a city state.
            </IonCardContent>
          </IonCard>
        </IonSlide>
        <IonSlide>
          <IonCard class="fullscreen-card">
            <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
            <IonCardHeader>
              <IonCardTitle>Destination</IonCardTitle>
              <IonCardSubtitle>Singapore</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Singapore is a city state. 
            </IonCardContent>
          </IonCard>
        </IonSlide>
      </IonSlides>
    );
    return fullscreenMenu;
  }

  private renderDetailedMenu() : JSX.Element{
    const detailedMenu = (
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true} >
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
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
            <IonSlides pager={false} scrollbar={true} >
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
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
            <IonSlides pager={false} scrollbar={true} >
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" alt="jsx-a11y/alt-text" />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Singapore is a city state. 
                  </IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
      </IonGrid>
      );
      return detailedMenu;
  }

  render(){
    return(
      <>
        <IonHeader>
          <IonToolbar>
            <IonIcon class="arrow-back-icon" slot="start" name="arrow-back" size="large" 
              onClick={(e) => (this.props.history.action === "POP") ? this.props.history.push("/home") : this.props.history.goBack()}/>
            <IonButtons slot="primary">
            </IonButtons>
            <IonTitle onClick={(e) => this.setState((state, props) => ({fullscreen : !state.fullscreen}))}>{this.state.localization.APP_NAME}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.renderMenu()}
        </IonContent>
      </>
    );
  }
}

export default Menu;