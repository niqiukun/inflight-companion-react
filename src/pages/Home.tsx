import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonItem,
  IonLabel, IonList,
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
              <IonButton>Edit</IonButton>
            </IonButtons>
            <IonTitle>More</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList class="list">
            <IonItem>
              <IonLabel>Check-In</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>Special Offers</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>KrisFlyer</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>KrisWorld</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>e-Library</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>Flight Schedules</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>KrisShop</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>Help</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
            <IonItem>
              <IonLabel>Settings</IonLabel>
              <IonIcon slot="end" name="arrow-forward" />
            </IonItem>
          </IonList>
        </IonContent>
      </>
    );
  }
}

export default Home;
