import React, { useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const CabinServicePage: React.FunctionComponent<RouteComponentProps<{}>> = (
  props: RouteComponentProps<{}>
) => {
  const [drinkSelected, setDrinkSelected] = useState<string | undefined>(
    undefined
  );
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cabin Service</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h4>What may I help you with?</h4>
        <IonList>
          <IonRadioGroup
            allowEmptySelection={true}
            value={drinkSelected}
            onIonChange={(e: CustomEvent) => {
              setDrinkSelected(e.detail.value);
            }}
          >
            <div>
              <IonListHeader>
                <IonLabel>Request for Items</IonLabel>
              </IonListHeader>
              <IonItem class="menu-list-item">
                <IonLabel>Earphones</IonLabel>
                <IonRadio slot="start" value="earphones" />
              </IonItem>
              <IonItem class="menu-list-item">
                <IonLabel>Extra Blanket</IonLabel>
                <IonRadio slot="start" value="blanket" />
              </IonItem>
              <IonItem class="menu-list-item">
                <IonLabel>Immigration Form</IonLabel>
                <IonRadio slot="start" value="immigration" />
              </IonItem>
              <IonListHeader>
                <IonLabel>Services</IonLabel>
              </IonListHeader>
              <IonItem class="menu-list-item">
                <IonLabel>Discard Unwanted Items</IonLabel>
                <IonRadio slot="start" value="clear-trash" />
              </IonItem>
            </div>
          </IonRadioGroup>
        </IonList>
        <h4>
          {drinkSelected === undefined || drinkSelected === null
            ? "Or, call our service directly below:"
            : "Please call our service below:"}
        </h4>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            className="order-btn"
            expand="block"
            onClick={() => {
              setShowAlert(true);
              props.history.push("/home");
            }}
          >
            Call Cabin Service
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Request Submitted"
        message="Our flight attendant will attend to you shortly."
        buttons={["OK"]}
      />
    </>
  );
};

export default CabinServicePage;
