import React, { useEffect, useState } from "react";
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
  const [category, setCategory] = useState("General");
  const [feedback, setFeedback] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setCategory(props.location.state.category);
    }
  }, [props.location.state]);

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
          <IonSelect
            value={category}
            interface="popover"
            onIonChange={(e: CustomEvent) => {
              setCategory(e.detail.value);
            }}
          >
            <IonSelectOption value="General">General</IonSelectOption>
            <IonSelectOption value="Dining">Dining</IonSelectOption>
            <IonSelectOption value="Beverages">Beverages</IonSelectOption>
            <IonSelectOption value="KrisWorld">KrisWorld</IonSelectOption>
            <IonSelectOption value="KrisShop">KrisShop</IonSelectOption>
            <IonSelectOption value="Cabin Service">
              Cabin Service
            </IonSelectOption>
            <IonSelectOption value="Others">Others</IonSelectOption>
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
        header="Thank You"
        message="Your feedback has been recorded."
        buttons={["OK"]}
      />
    </>
  );
};

export default FeedbackPage;
