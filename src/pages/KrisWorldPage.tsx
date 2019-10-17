import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonListHeader,
  IonRow,
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
        <IonListHeader class="dark">Recommended</IonListHeader>
        <IonRow style={{ padding: "0 6px" }}>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background:
                  'darkgray url("/assets/img/posters/aladdin.jpg") 0 0/100%',
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}></IonCol>
          <IonCol size="4" style={{ padding: "8px" }}></IonCol>
        </IonRow>
        <IonListHeader class="dark">New Releases</IonListHeader>
        <IonRow style={{ padding: "0 6px" }}>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background:
                  'darkgray url("/assets/img/posters/aladdin.jpg") 0 0/100%',
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/joker.jpg\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/abominable.jpg\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow style={{ padding: "0 6px" }}>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/weathering.webp\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/gemini.webp\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/captain.webp\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow style={{ padding: "0 6px" }}>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/climbers.webp\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background:
                  'darkgray url("/assets/img/posters/pink.webp") 0 0/100%',
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
          <IonCol size="4" style={{ padding: "8px" }}>
            <div
              style={{
                background: "darkgray url(\"/assets/img/posters/war.webp\") 0 0/100%",
                width: "100%",
                paddingBottom: "150%"
              }}
            />
          </IonCol>
        </IonRow>
        <div style={{ color: "white", margin: "12px" }}>
          {/*Sorry, this feature is not available for demo :(*/}
        </div>
      </IonContent>
    </>
  );
};

export default KrisWorldPage;
