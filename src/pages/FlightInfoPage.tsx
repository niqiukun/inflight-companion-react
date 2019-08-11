import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const FlightInfoPage: React.FunctionComponent<RouteComponentProps<{}>> = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar class="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle class="dark">Flight Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="dark">
        <div className="world-map"></div>
        <IonGrid>
          <IonRow class="flight-info-row">
            <IonCol size="6">
              <div className="text-small">Time to Destination</div>
              <div className="text-large time-label">
                <IonIcon class="time-label-icon" name="airplane" />
                02:00
              </div>
            </IonCol>
            <IonCol size="6">
              <div className="text-small">Estimated Arrival Time</div>
              <div className="text-large time-label">
                <IonIcon class="time-label-icon" name="md-time" />
                05:55
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" style={{ paddingTop: "28px", color: "white" }}>
              <div>SIN</div>
            </IonCol>
            <IonCol size="8">
              <img
                style={{
                  marginTop: "16px",
                  marginBottom: "6px"
                }}
                alt="flight-icon"
                src="/assets/img/flight_icon.png"
              />
            </IonCol>
            <IonCol size="2" style={{ paddingTop: "28px", color: "white" }}>
              <div>PVG</div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6" style={{ padding: "2px" }}>
              <IonRow>
                <IonCol class="destination-card">
                  <div className="text-large">Singapore</div>
                  <div className="text-small">Singapore Changi Airport</div>
                  <hr />
                  <div className="text-small">Local Time</div>
                  <div className="text-normal">03:55</div>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol size="6" style={{ padding: "2px" }}>
              <IonRow>
                <IonCol class="destination-card">
                  <div className="text-large">Shanghai</div>
                  <div className="text-small">Shanghai Pudong Intl Airport</div>
                  <hr />
                  <div className="text-small">Local Time</div>
                  <div className="text-normal">03:55</div>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="destination-card other-info">
              <IonRow>
                <IonCol size="6" style={{ padding: "0" }}>
                  <div className="text-small">Ground Speed</div>
                  <div className="text-large time-label">400 mph</div>
                </IonCol>
                <IonCol size="6" style={{ padding: "0" }}>
                  <div className="text-small">Attitude</div>
                  <div className="text-large time-label">10000 m</div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6" style={{ padding: "0" }}>
                  <div className="text-small">Wind Speed</div>
                  <div className="text-large time-label">57.50 mph</div>
                </IonCol>
                <IonCol size="6" style={{ padding: "0" }}>
                  <div className="text-small">Wind Direction</div>
                  <div className="text-large time-label">East</div>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default FlightInfoPage;
