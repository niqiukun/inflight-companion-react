import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const WelcomePage: React.FunctionComponent<RouteComponentProps<{}>> = () => {
  const [code, setCode] = useState("");

  return (
    <>
      <IonContent>
        <div style={{ height: "10%" }} />
        <h1 style={{ margin: "32px 0" }}>Welcome Aboard</h1>
        <p style={{ margin: "32px 0" }}>
          Please scan the QR code or key in the manual connection code below to
          continue:
        </p>
        <IonItem class="menu-list-item" style={{ margin: "32px 0" }}>
          <IonLabel color="primary" position="stacked">
            Code
          </IonLabel>
          <IonInput
            name="code"
            type="text"
            value={code}
            required
            onIonChange={(event: CustomEvent) => setCode(event.detail.value)}
          />
        </IonItem>
        <IonButton
          expand="block"
          style={{ margin: "24px 20px" }}
          onClick={() => {
            window.location.href = "/home?key=" + code;
          }}
        >
          Confirm
        </IonButton>
      </IonContent>
    </>
  );
};

export default WelcomePage;
