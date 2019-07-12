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

class Home extends React.Component<Props, {language : any, languageAlert: boolean}> {

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
          {/* <h1>Welcome Aboard</h1> */}
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
          <IonListHeader class="transparent">{this.state.language.inflight_services}</IonListHeader>
          <IonList class="list transparent">
            <IonItem>
              <IonLabel>{this.state.language.dining}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="restaurant" />
            </IonItem>
            <IonItem>
              <IonLabel>{this.state.language.kris_world}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="tv" />
            </IonItem>
            <IonItem>
              <IonLabel>{this.state.language.kris_shop}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="cart" />
            </IonItem>
            <IonItem>
              <IonLabel>{this.state.language.seat_upgrade}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon
                class="list-icon"
                slot="start"
                name="md-arrow-round-up"
              />
            </IonItem>
            <IonItem>
              <IonLabel>{this.state.language.other_services}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon
                class="list-icon"
                slot="start"
                name="information-circle"
              />
            </IonItem>
            <IonItem>
              <IonLabel>{this.state.language.feedback}</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="chatbubbles" />
            </IonItem>
          </IonList>
        </IonContent>
      </>
    );
  }
}

export default Home;
