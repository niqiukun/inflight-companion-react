import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import "../App.css";
import { LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
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
      localization: localLanguage
    };

    console.log(this.props.history);
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
            <IonTitle>{this.state.localization.APP_NAME}</IonTitle>
          </IonToolbar>
        </IonHeader>
      </>
    );
  }
}

export default Menu;