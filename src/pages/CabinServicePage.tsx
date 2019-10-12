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
import { callService } from "../network/Customer";

const CabinServicePage: React.FunctionComponent<RouteComponentProps<{}>> = (
  props: RouteComponentProps<{}>
) => {
  const [serviceSelected, setServiceSelected] = useState<string | undefined>(
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
            value={serviceSelected}
            onIonChange={(e: CustomEvent) => {
              setServiceSelected(e.detail.value);
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
                <IonLabel>Extra Cushion</IonLabel>
                <IonRadio slot="start" value="cushion" />
              </IonItem>
              <IonItem class="menu-list-item">
                <IonLabel>Immigration Form</IonLabel>
                <IonRadio slot="start" value="immigration" />
              </IonItem>
              <IonItem class="menu-list-item">
                <IonLabel>Newspaper</IonLabel>
                <IonRadio slot="start" value="newspaper" />
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
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <h4>
            {serviceSelected === undefined || serviceSelected === null
              ? "Or, call our service directly below:"
              : "Please submit your request below:"}
          </h4>
        </IonToolbar>
        <IonToolbar>
          <IonButton
            className="order-btn"
            expand="block"
            onClick={() => {
              let serviceContent =
                serviceSelected === undefined || serviceSelected === null
                  ? "Assistance"
                  : serviceSelected;
              callService(serviceContent)
                .then(msg => console.log(msg.Message))
                .catch(msg => console.error(msg.Message));
              setShowAlert(true);
              props.history.push("/home");
            }}
          >
            {serviceSelected === undefined || serviceSelected === null
              ? "Call Cabin Service"
              : "Submit Request"}
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
