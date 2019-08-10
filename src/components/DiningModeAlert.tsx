import React from "react";
import { IonAlert } from "@ionic/react";

interface AlertProps {
  showAlert: boolean;
  closeAlert: (event: CustomEvent) => void;
  currentModeIsA: boolean;
}

const DiningModeAlert: React.FunctionComponent<AlertProps> = (
  props: AlertProps
) => {
  const { showAlert, closeAlert } = props;

  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={closeAlert}
      header={"Dining Mode Selection"}
      message={
        "<p>Two modes available in this demo:</p>" +
        "<p><b>Mode A:</b> Display two options for the entire menu. It is consistent with the current experience of customers travelling with SIA.</p>" +
        "<p><b>Mode B:</b> Display various options for each component in the menu. It allows customers to customise their meals with greater flexibility.</p>" +
        "<p>*Selecting dining mode will reset any order that you have placed.</p>"
      }
      backdropDismiss={false}
      buttons={[
        {
          text: "Mode A",
          handler: () => {
            localStorage.clear();
            localStorage.setItem("dining_mode", "A");
            if (!props.currentModeIsA) {
              window.location.href = "/simple-dining";
            }
          }
        },
        {
          text: "Mode B",
          handler: () => {
            localStorage.clear();
            localStorage.setItem("dining_mode", "B");
            if (props.currentModeIsA) {
              window.location.href = "/dining";
            }
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary"
        }
      ]}
    />
  );
};

export default DiningModeAlert;
