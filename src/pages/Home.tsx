import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonTitle,
  IonToolbar,
  IonAlert
} from "@ionic/react";
import "../App.css";
import * as strings from "../localization.json";

type Props = RouteComponentProps<any>;

interface States {
  language: any,
  languageAlert: boolean
};

class Home extends React.Component<Props, States> {

  constructor(props: Props){
    super(props);
    this.state = { language : strings.en, languageAlert: false };
  }
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={() => {this.setState({languageAlert: true})}}>{this.state.language.languages}</IonButton>
              <IonAlert
                isOpen={this.state.languageAlert}
                onDidDismiss={() => this.setState({languageAlert: false})}
                header={this.state.language.languages}
                message={this.state.language.choose_language_alert}
                buttons={[
                  {
                    text: 'English',
                    handler: () => {
                      this.setState({language: strings.en});
                    }
                  },
                  {
                    text: '中文',
                    handler: () => {
                      this.setState({language: strings.zh});
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                  }
                ]}
              />
            </IonButtons>
            <IonTitle>{this.state.language.app_name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>{this.state.language.welcome_aboard}</h1>
          <div className="flight-code-label">SQ825 | 50A</div>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <div className="text-small">{this.state.language.time_to_destination}</div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="airplane" />
                  02:00
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="text-small">{this.state.language.estimated_arrival_time}</div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="md-time" />
                  05:55
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6" class="destination-card">
                <div className="text-large">{this.state.language.singapore}</div>
                <div className="text-small">{this.state.language.singapore_changi_airport}</div>
                <hr />
                <div className="text-small">{this.state.language.local_time}</div>
                <div className="text-normal">
                  {new Date().toLocaleTimeString("en-SG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </IonCol>
              <IonCol size="6" class="destination-card">
                <div className="text-large">{this.state.language.shanghai}</div>
                <div className="text-small">{this.state.language.shanghai_pudong_intl_airport}</div>
                <hr />
                <div className="text-small">{this.state.language.local_time}</div>
                <div className="text-normal">
                  {new Date().toLocaleTimeString("en-SG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Start of Service List */}
          <IonListHeader class="transparent">{this.state.language.inflight_services}</IonListHeader>
          <IonList class="list transparent">
            <ServiceListItem labelText={this.state.language.dining} iconName="restaurant" />
            <ServiceListItem labelText={this.state.language.kris_world} iconName="tv" />
            <ServiceListItem labelText={this.state.language.kris_shop} iconName="cart" />
            <ServiceListItem labelText={this.state.language.seat_upgrade} iconName="md-arrow-round-up" />
            <ServiceListItem labelText={this.state.language.other_services} iconName="information-circle" />
            <ServiceListItem labelText={this.state.language.feedback} iconName="chatbubbles" />
          </IonList>
        </IonContent>
      </>
    );
  }
}

interface ServiceListItemProps{
  labelText : string,
  iconName: string
}
class ServiceListItem extends React.Component<ServiceListItemProps>{
  render(){
    return (
      <IonItem>
        <IonLabel>{this.props.labelText}</IonLabel>
        <IonIcon
          class="arrow-forward-icon"
          slot="end"
          name="arrow-forward"
        />
        <IonIcon
          class="list-icon"
          slot="start"
          name={this.props.iconName}
        />
      </IonItem>
    );
  }
}

export default Home;
