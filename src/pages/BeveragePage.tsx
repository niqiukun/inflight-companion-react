import React, { useEffect, useState } from "react";
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
import { BEVERAGES } from "../text/beverages";
import { RouteComponentProps } from "react-router";

const BeveragePage: React.FunctionComponent<RouteComponentProps<{}>> = (
  props: RouteComponentProps<{}>
) => {
  const [drinkSelected, setDrinkSelected] = useState<string | undefined>(
    undefined
  );
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setDrinkSelected(localStorage.getItem("beverage") || undefined);
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Beverages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonRadioGroup
            allowEmptySelection={true}
            value={drinkSelected}
            onIonChange={(e: CustomEvent) => {
              setDrinkSelected(e.detail.value);
            }}
          >
            {Object.keys(BEVERAGES).map(key => {
              return (
                <div key={key}>
                  <IonListHeader>
                    <IonLabel>{key}</IonLabel>
                  </IonListHeader>
                  {BEVERAGES[key].map(value => {
                    return (
                      <IonItem key={key + value} class="menu-list-item">
                        <IonLabel>{value}</IonLabel>
                        <IonRadio slot="start" value={value} />
                      </IonItem>
                    );
                  })}
                </div>
              );
            })}
          </IonRadioGroup>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div className="cart-labels">
            <div>Beverage: {drinkSelected || "not selected"}</div>
          </div>
          <IonButton
            slot="end"
            disabled={drinkSelected === undefined || drinkSelected === null}
            className="order-btn"
            onClick={() => {
              drinkSelected && localStorage.setItem("beverage", drinkSelected);
              setShowAlert(true);
              props.history.push("/home");
            }}
          >
            Place Order
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Order Placed"
        message="Your order has been placed.<br />We will serve the beverage to you shortly."
        buttons={["OK"]}
      />
    </>
  );
};

export default BeveragePage;
