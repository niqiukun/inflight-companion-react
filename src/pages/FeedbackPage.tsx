import React, { useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const FeedbackPage: React.FunctionComponent<RouteComponentProps<{}>> = (
  props: RouteComponentProps<{}>
) => {
  const [feedback, setFeedback] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h4>How is your experience with us?</h4>
        <IonItem>
          <IonLabel>Category</IonLabel>
          <IonSelect value="General" interface="popover">
            <IonSelectOption value="General">General</IonSelectOption>
            <IonSelectOption value="Dining">Dining</IonSelectOption>
            <IonSelectOption value="Dining">Beverages</IonSelectOption>
            <IonSelectOption value="Dining">KrisWorld</IonSelectOption>
            <IonSelectOption value="Dining">KrisShop</IonSelectOption>
            <IonSelectOption value="Dining">Cabin Service</IonSelectOption>
            <IonSelectOption value="Dining">Others</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonTextarea
            rows={10}
            autoGrow={true}
            placeholder="Type your feedback here..."
            value={feedback}
            onIonChange={(e: CustomEvent) => setFeedback(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonInput placeholder="Name (optional)" />
        </IonItem>
        <IonItem lines="none">
          <IonInput placeholder="Email (optional)" />
        </IonItem>
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
            disabled={feedback === ""}
          >
            Submit
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Feedback Submitted"
        message="Your feedback has been recorded."
        buttons={["OK"]}
      />
    </>
  );
};

export default FeedbackPage;
