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

const KrisShopPage: React.FunctionComponent<RouteComponentProps<{}>> = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>KrisShop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ margin: "12px" }}>
          Sorry, this feature is not available for demo :(
        </div>
      </IonContent>
    </>
  );
};

export default KrisShopPage;
