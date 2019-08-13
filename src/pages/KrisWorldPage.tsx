import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const KrisWorldPage: React.FunctionComponent<RouteComponentProps<{}>> = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar class="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle class="dark">KrisWorld</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="dark">
        <div style={{ color: "white", margin: "12px" }}>
          Sorry, this feature is not available for demo :(
        </div>
      </IonContent>
    </>
  );
};

export default KrisWorldPage;
