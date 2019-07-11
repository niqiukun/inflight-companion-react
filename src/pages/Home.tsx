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
  IonToolbar
} from "@ionic/react";
import "../App.css";

type Props = RouteComponentProps<any>;

class Home extends React.Component<Props> {
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton>Language</IonButton>
            </IonButtons>
            <IonTitle>In-flight Companion</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>Welcome Aboard</h1>
          <div className="flight-code-label">SQ825 | 50A</div>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <div className="text-small">Time to Destination</div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="airplane" />
                  02:00
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="text-small">Estimated Arrival Time</div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="md-time" />
                  05:55
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6" class="destination-card">
                <div className="text-large">Singapore</div>
                <div className="text-small">Singapore Changi Airport</div>
                <hr />
                <div className="text-small">Local Time</div>
                <div className="text-normal">
                  {new Date().toLocaleTimeString("en-SG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </IonCol>
              <IonCol size="6" class="destination-card">
                <div className="text-large">Shanghai</div>
                <div className="text-small">Shanghai Pudong Intl Airport</div>
                <hr />
                <div className="text-small">Local Time</div>
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
          <IonListHeader class="transparent">In-flight Services</IonListHeader>
          <IonList class="list transparent">
            <IonItem>
              <IonLabel>Dining</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="restaurant" />
            </IonItem>
            <IonItem>
              <IonLabel>KrisWorld</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="tv" />
            </IonItem>
            <IonItem>
              <IonLabel>KrisShop</IonLabel>
              <IonIcon
                class="arrow-forward-icon"
                slot="end"
                name="arrow-forward"
              />
              <IonIcon class="list-icon" slot="start" name="cart" />
            </IonItem>
            <IonItem>
              <IonLabel>Seat Upgrade</IonLabel>
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
              <IonLabel>Other Services</IonLabel>
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
              <IonLabel>Feedback</IonLabel>
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
