import React, { useEffect, useState } from "react";
import {
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

const BeveragePage: React.FunctionComponent = () => {
  const [drinkSelected, setDrinkSelected] = useState<string | undefined>(
    undefined
  );

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
                        <IonRadio slot="start" value={value.toLowerCase()} />
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
            disabled={drinkSelected === undefined}
            className="order-btn"
            onClick={() => {}}
          >
            Place Order
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default BeveragePage;
