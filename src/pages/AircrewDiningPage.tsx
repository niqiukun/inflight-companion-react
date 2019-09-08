import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
  IonToast,
  useIonViewDidEnter,
  IonButtons,
  IonIcon,
  IonBadge
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const AircrewDiningPage: React.FunctionComponent<
  RouteComponentProps<{}>
> = () => {
  let orders: Record<string, string> = {};
  let isServed: Record<string, boolean> = {};
  Array.from(Array(43).keys()).forEach(x => {
    ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"].forEach(y => {
      let randomNum = Math.floor(Math.random() * 5 + 1);
      if (randomNum === 1) {
        orders[(x + 31).toString() + y] = "";
      } else if (randomNum > 1 && randomNum <= 3) {
        orders[(x + 31).toString() + y] = "A";
      } else {
        orders[(x + 31).toString() + y] = "B";
      }
      if (
        (x + 31 <= 36 && y < "F") ||
        (x + 31 === 37 && y <= "B") ||
        x + 31 < 35
      ) {
        isServed[(x + 31).toString() + y] = true;
        orders[(x + 31).toString() + y] =
          orders[(x + 31).toString() + y] || "B";
      } else {
        isServed[(x + 31).toString() + y] = false;
      }
    });
  });
  const [selectedSeat, setSelectedSeat] = useState("");
  const [mealOrders] = useState(orders);
  const [isSeatServed, setIsSeatServed] = useState(isServed);
  const [showToast, setShowToast] = useState(false);

  const renderSeat = (seatNumber: string) => {
    let rowNumber = Number.parseInt(seatNumber.substring(0, 2));
    let seatCode = seatNumber.charAt(2);
    if (rowNumber > 30 && rowNumber < 35 && seatCode > "C" && seatCode < "H") {
      return <div />;
    }
    if (rowNumber === 40 && seatCode > "C" && seatCode < "H") {
      return <div />;
    }
    return (
      <div
        onClick={() => {
          setSelectedSeat(seatNumber);
        }}
      >
        <img
          src={
            seatNumber === "40J"
              ? "/assets/img/seat_urgent.png"
              : selectedSeat !== seatNumber
              ? isSeatServed[seatNumber]
                ? "/assets/img/seat_served.png"
                : "/assets/img/seat.png"
              : "/assets/img/seat_selected.png"
          }
          alt="seat"
        />
        <div className="seat-label">{mealOrders[seatNumber]}</div>
      </div>
    );
  };

  useIonViewDidEnter(() => {
    setShowToast(true);
  });

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aircrew Portal</IonTitle>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="large" name="menu" />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton class="notification-button">
              <IonIcon size="large" name="mail"/>
              <IonBadge class="notification-badge" color="danger">
                1
              </IonBadge>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} style={{ "--padding-bottom": "26px" }}>
        <IonRow style={{ height: "100%" }}>
          <IonCol size="5" offset="1">
            <IonRow className="table-row table-header">
              <IonCol className="table-col" />
              <IonCol className="table-col">A</IonCol>
              <IonCol className="table-col">B</IonCol>
              <IonCol className="table-col">C</IonCol>
              <IonCol className="table-col">{"  "}</IonCol>
              <IonCol className="table-col">D</IonCol>
              <IonCol className="table-col">E</IonCol>
              <IonCol className="table-col">F</IonCol>
              <IonCol className="table-col">G</IonCol>
              <IonCol className="table-col">{"  "}</IonCol>
              <IonCol className="table-col">H</IonCol>
              <IonCol className="table-col">J</IonCol>
              <IonCol className="table-col">K</IonCol>
            </IonRow>
            <IonContent class="small-content">
              {Array.from(Array(43).keys())
                .filter(x => x + 31 !== 41 && x + 31 !== 54)
                .map(x => (
                  <IonRow className="table-row" key={x}>
                    <IonCol className="table-col">{x + 31}</IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "A")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "B")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "C")}
                    </IonCol>
                    <IonCol className="table-col">{"  "}</IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "D")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "E")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "F")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "G")}
                    </IonCol>
                    <IonCol className="table-col">{"  "}</IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "H")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "J")}
                    </IonCol>
                    <IonCol className="table-col">
                      {renderSeat((x + 31).toString() + "K")}
                    </IonCol>
                  </IonRow>
                ))}
            </IonContent>
          </IonCol>
          <IonCol size="5">
            <IonContent class="small-content">
              <IonList>
                <IonItem class="menu-list-item">
                  <IonLabel position="fixed">Current Seat: </IonLabel>
                  <IonInput readonly value={selectedSeat} />
                </IonItem>
                <IonItem class="menu-list-item" lines="none">
                  <IonLabel position="fixed">Meal Choice: </IonLabel>
                </IonItem>
                {mealOrders[selectedSeat] === "A" && (
                  <>
                    <IonItem class="menu-list-item" lines="none">
                      <img
                        src="/assets/img/meals/grilled_beef.jpg"
                        alt="beef"
                      />
                    </IonItem>
                    <IonItem class="menu-list-item" lines="full">
                      <IonLabel slot="start">International Selection</IonLabel>
                      <IonButton
                        slot="end"
                        size="default"
                        style={{ width: "120px" }}
                        fill={"outline"}
                      >
                        Change
                      </IonButton>
                    </IonItem>
                    <IonItem class="menu-list-item">
                      <IonLabel position="fixed">Availability: </IonLabel>
                      <IonInput readonly value={"258"} />
                      <IonButton
                        slot="end"
                        size="default"
                        style={{ width: "120px" }}
                        fill={isSeatServed[selectedSeat] ? "solid" : "outline"}
                        onClick={() => {
                          setIsSeatServed(prevState => {
                            let newState: Record<string, boolean> = {};
                            Object.keys(prevState).forEach(x => {
                              newState[x] =
                                x === selectedSeat
                                  ? !prevState[x]
                                  : prevState[x];
                            });
                            return newState;
                          });
                        }}
                      >
                        {isSeatServed[selectedSeat] ? "Served" : "Serve"}
                      </IonButton>
                    </IonItem>
                  </>
                )}
                {mealOrders[selectedSeat] === "B" && (
                  <>
                    <IonItem class="menu-list-item" lines="none">
                      <img
                        src="/assets/img/meals/chicken_rice.jpg"
                        alt="rice"
                      />
                    </IonItem>
                    <IonItem class="menu-list-item" lines="full">
                      <IonLabel slot="start">Oriental Selection</IonLabel>
                      <IonButton
                        slot="end"
                        size="default"
                        style={{ width: "120px" }}
                        fill={"outline"}
                      >
                        Change
                      </IonButton>
                    </IonItem>
                    <IonItem class="menu-list-item">
                      <IonLabel position="fixed">Availability: </IonLabel>
                      <IonInput readonly value={"132"} />
                      <IonButton
                        slot="end"
                        size="default"
                        style={{ width: "120px" }}
                        fill={isSeatServed[selectedSeat] ? "solid" : "outline"}
                        onClick={() => {
                          setIsSeatServed(prevState => {
                            let newState: Record<string, boolean> = {};
                            Object.keys(prevState).forEach(x => {
                              newState[x] =
                                x === selectedSeat
                                  ? !prevState[x]
                                  : prevState[x];
                            });
                            return newState;
                          });
                        }}
                      >
                        {isSeatServed[selectedSeat] ? "Served" : "Serve"}
                      </IonButton>
                    </IonItem>
                  </>
                )}
                {mealOrders[selectedSeat] === "" && (
                  <>
                    <IonItem class="menu-list-item">No Order</IonItem>
                  </>
                )}
              </IonList>
            </IonContent>
            <IonFooter style={{ marginTop: "-26px" }}>
              <IonToolbar>
                <IonButton slot="start" style={{ width: "120px" }}>
                  Previous
                </IonButton>
                <IonButton slot="end" style={{ width: "120px" }}>
                  Next
                </IonButton>
              </IonToolbar>
            </IonFooter>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Passenger at 40J is asking for: coffee"
        cssClass="aircrew-toast"
      />
    </>
  );
};

export default AircrewDiningPage;
