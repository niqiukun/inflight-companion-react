import React, { useState, useEffect } from "react";
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
  IonBadge,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { login } from "../network/Common";
import {
  getOrderList,
  aircrewPlaceOrder,
  getServiceList,
  serveOrder,
  resolveService
} from "../network/Aircrew";

const AircrewDiningPage: React.FunctionComponent<
  RouteComponentProps<{}>
> = () => {
  let orders: { [key: string]: string } = {};
  let isServed: { [key: string]: boolean } = {};
  let requests: { [key: string]: string } = {};
  Array.from(Array(43).keys()).forEach(x => {
    ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"].forEach(y => {
      let randomNum = Math.floor(Math.random() * 24);
      if (randomNum === 0) {
        orders[(x + 31).toString() + y] = "P";
      } else if (randomNum > 0 && randomNum <= 10) {
        orders[(x + 31).toString() + y] = "A";
      } else if (randomNum > 10 && randomNum <= 20) {
        orders[(x + 31).toString() + y] = "B";
      } else {
        orders[(x + 31).toString() + y] = "";
      }
      if (x === 6 && y === "C") {
        orders[(x + 31).toString() + y] = "B";
      }
      if (x === 9 && y === "J") {
        orders[(x + 31).toString() + y] = "A";
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
  orders["42A"] = "";
  orders["42B"] = "B";
  orders["42C"] = "";
  // requests["40J"] = "Coffee";
  const [selectedSeat, setSelectedSeat] = useState("37C");
  const [mealOrders, setMealOrders] = useState(orders);
  const [isSeatServed, setIsSeatServed] = useState(isServed);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orientalAvailability, setOrientalAvailability] = useState(132);
  const [westernAvailability, setWesternAvailability] = useState(258);
  const [requestList, setRequestList] = useState(requests);
  const [serverOrderString, setServerOrderString] = useState("[]");
  const [toastSeatNumber, setToastSeatNumber] = useState("40J");
  const [toastRequest, setToastRequest] = useState("Coffee");

  interface Order {
    dishId: string;
    orderId: string;
    payment: string;
    quantity: string;
    servedQuantity: number;
    status: string;
    userId: string;
  }

  const updateOrdersFromServer = (orderString: string) => {
    setServerOrderString(orderString);
  };

  const checkOrders = () => {
    getOrderList()
      .then(msg => updateOrdersFromServer(msg.Message))
      // .then(msg => console.log(msg.Message))
      .catch(msg => console.error(msg));
  };

  interface Service {
    serviceId: string;
    userId: string;
    serviceContent: string;
    resolved: boolean;
  }

  const checkService = () => {
    getServiceList()
      .then(msg => {
        setRequestList(prevState => {
          let serviceList: Service[] = JSON.parse(msg.Message);
          let newRequestList: { [key: string]: string } = Object.assign(
            {},
            prevState
          );
          for (let service of serviceList) {
            if (
              newRequestList[service.userId] !== service.serviceContent &&
              !service.resolved
            ) {
              console.log("Service updated for customer at " + service.userId);
              newRequestList[service.userId] = service.serviceContent;
              setToastRequest(service.serviceContent);
              setToastSeatNumber(service.userId);
              setShowToast(true);
            }
            if (service.resolved && newRequestList[service.userId]) {
              delete newRequestList[service.userId];
              console.log("Service resolved for customer at " + service.userId);
            }
          }
          return newRequestList;
        });
      })
      .catch(msg => console.error(msg.Message));
  };

  useEffect(() => {
    login("3", "password3")
      .then(msg => {
        console.log(msg);
        let orderIntervalId = setInterval(checkOrders, 500);
        let serviceIntervalId = setInterval(checkService, 500);
      })
      .catch(msg => console.error(msg));
  }, []);

  useEffect(() => {
    let list: Order[] = JSON.parse(serverOrderString);
    for (let order of list) {
      handleOrderChange(order.userId, order.dishId === "1" ? "A" : "B");
    }
  }, [serverOrderString]);

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
            Object.keys(requestList).includes(seatNumber)
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

  const renderServeButton = (mealType: string) => {
    return (
      <IonButton
        slot="end"
        size="default"
        style={{ width: "120px" }}
        fill={isSeatServed[selectedSeat] ? "solid" : "outline"}
        onClick={() => {
          if (mealType === "western") {
            setWesternAvailability(
              prevState => prevState + (isSeatServed[selectedSeat] ? 1 : -1)
            );
          } else if (mealType === "oriental") {
            setOrientalAvailability(
              prevState => prevState + (isSeatServed[selectedSeat] ? 1 : -1)
            );
          }
          setIsSeatServed(prevState => {
            let newState: Record<string, boolean> = {};
            Object.keys(prevState).forEach(x => {
              newState[x] = x === selectedSeat ? !prevState[x] : prevState[x];
            });
            return newState;
          });
          serveOrder(selectedSeat)
            .then(msg => console.log(msg.Message))
            .catch(msg => console.error(msg.Message));
        }}
      >
        {isSeatServed[selectedSeat] ? "Served" : "Serve"}
      </IonButton>
    );
  };

  useIonViewDidEnter(() => {
    // setShowToast(true);
  });

  const handleOrderChange = (seatNumber: string, newOrder: string) => {
    setMealOrders(prevState => {
      let tempHash: { [key: string]: string } = Object.assign({}, prevState);
      tempHash[seatNumber] = newOrder;
      if (newOrder !== prevState[seatNumber]) {
        aircrewPlaceOrder(seatNumber, newOrder === "A" ? "1" : "2", "1")
          .then(msg => console.log(msg))
          .catch(msg => console.error(msg));
      }
      return tempHash;
    });
  };

  const nextSeatNumber = (seatNumber: string) => {
    let rowNumber = Number.parseInt(seatNumber.substring(0, 2));
    let seatCode = seatNumber.charAt(2);
    if (
      seatCode === "E" ||
      (seatCode === "C" &&
        (rowNumber === 40 || (rowNumber >= 31 && rowNumber <= 34)))
    ) {
      return (rowNumber + (rowNumber === 40 ? 2 : 1)).toString() + "A";
    } else if (seatCode === "K") {
      return (rowNumber + 1).toString() + "F";
    } else if (seatCode === "H") {
      return (
        rowNumber.toString() + String.fromCharCode(seatCode.charCodeAt(0) + 2)
      );
    } else {
      return (
        rowNumber.toString() + String.fromCharCode(seatCode.charCodeAt(0) + 1)
      );
    }
  };

  const prevSeatNumber = (seatNumber: string) => {
    let rowNumber = Number.parseInt(seatNumber.substring(0, 2));
    let seatCode = seatNumber.charAt(2);
    if (seatCode <= "A") {
      return (rowNumber - 1).toString() + "E";
    } else {
      return (
        rowNumber.toString() + String.fromCharCode(seatCode.charCodeAt(0) - 1)
      );
    }
  };

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
            <IonButton
              class="notification-button"
              onClick={() => setShowModal(true)}
            >
              <IonIcon size="large" name="mail" />
              {Object.keys(requestList).length !== 0 && (
                <IonBadge class="notification-badge" color="danger">
                  {Object.keys(requestList).length}
                </IonBadge>
              )}
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
            <IonFooter style={{ marginTop: "-155px" }}>
              <IonToolbar>
                <div>
                  <IonRow>
                    <IonCol>
                      <b>Legend</b>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="6" style={{ textAlign: "left" }}>
                      <img
                        style={{ height: "25px" }}
                        src={"/assets/img/seat.png"}
                        alt={"blue seat"}
                      />{" "}
                      To Be Served
                      <br />
                      <img
                        style={{ height: "25px" }}
                        src={"/assets/img/seat_served.png"}
                        alt={"green seat"}
                      />{" "}
                      Served
                      <br />
                      <img
                        style={{ height: "25px" }}
                        src={"/assets/img/seat_selected.png"}
                        alt={"yellow seat"}
                      />{" "}
                      Currently Serving
                      <br />
                      <img
                        style={{ height: "25px" }}
                        src={"/assets/img/seat_urgent.png"}
                        alt={"red seat"}
                      />{" "}
                      Has Pending Request
                    </IonCol>
                    <IonCol size="6" style={{ textAlign: "left" }}>
                      <div style={{ marginBottom: "6px" }}>
                        A: International Selection
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        B: Oriental Selection
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        P: Pre-ordered Meal
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        Empty: Not Selected
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
              </IonToolbar>
            </IonFooter>
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
                    <IonItem class="menu-list-item">
                      <IonLabel>International Selection</IonLabel>
                      <IonSelect
                        value={mealOrders[selectedSeat]}
                        selectedText="Change"
                        interface="popover"
                        disabled={isSeatServed[selectedSeat]}
                        onIonChange={e => {
                          handleOrderChange(selectedSeat, e.detail.value);
                        }}
                      >
                        <IonSelectOption value="A">
                          International Selection
                        </IonSelectOption>
                        <IonSelectOption value="B">
                          Oriental Selection
                        </IonSelectOption>
                        <IonSelectOption value="">No Meal</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem class="menu-list-item">
                      <IonLabel position="fixed">Availability: </IonLabel>
                      <IonInput
                        readonly
                        value={westernAvailability.toString()}
                      />
                      {renderServeButton("western")}
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
                    <IonItem class="menu-list-item">
                      <IonLabel>Oriental Selection</IonLabel>
                      <IonSelect
                        value={mealOrders[selectedSeat]}
                        selectedText="Change"
                        interface="popover"
                        disabled={isSeatServed[selectedSeat]}
                        onIonChange={e => {
                          handleOrderChange(selectedSeat, e.detail.value);
                        }}
                      >
                        <IonSelectOption value="A">
                          International Selection
                        </IonSelectOption>
                        <IonSelectOption value="B">
                          Oriental Selection
                        </IonSelectOption>
                        <IonSelectOption value="">No Meal</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem class="menu-list-item">
                      <IonLabel position="fixed">Availability: </IonLabel>
                      <IonInput
                        readonly
                        value={orientalAvailability.toString()}
                      />
                      {renderServeButton("oriental")}
                    </IonItem>
                  </>
                )}
                {mealOrders[selectedSeat] === "" && (
                  <>
                    <IonItem class="menu-list-item">
                      <IonLabel>No Order</IonLabel>
                      <IonSelect
                        value={mealOrders[selectedSeat]}
                        selectedText="Add"
                        interface="popover"
                        disabled={isSeatServed[selectedSeat]}
                        onIonChange={e => {
                          handleOrderChange(selectedSeat, e.detail.value);
                        }}
                      >
                        <IonSelectOption value="A">
                          International Selection
                        </IonSelectOption>
                        <IonSelectOption value="B">
                          Oriental Selection
                        </IonSelectOption>
                        <IonSelectOption value="">No Meal</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </>
                )}
                {mealOrders[selectedSeat] === "P" && (
                  <>
                    <IonItem class="menu-list-item">
                      Pre-ordered Meal
                      {renderServeButton("western")}
                    </IonItem>
                  </>
                )}
              </IonList>
            </IonContent>
            <IonFooter style={{ marginTop: "-26px" }}>
              <IonToolbar>
                <IonButton
                  slot="start"
                  style={{ width: "120px" }}
                  onClick={() =>
                    setSelectedSeat(prevState => prevSeatNumber(prevState))
                  }
                >
                  Previous
                </IonButton>
                <IonButton
                  slot="end"
                  style={{ width: "120px" }}
                  onClick={() =>
                    setSelectedSeat(prevState => nextSeatNumber(prevState))
                  }
                >
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
        message={
          "Passenger at " + toastSeatNumber + " is asking for: " + toastRequest
        }
        cssClass="aircrew-toast"
        position="top"
        showCloseButton={true}
      />
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        backdropDismiss={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Messages
              {Object.keys(requestList).length === 0
                ? ""
                : " (" + Object.keys(requestList).length + ")"}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon name="close" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {Object.keys(requestList).map(x => {
            return (
              <IonCard key={x}>
                <IonCardContent style={{ background: "white" }}>
                  <IonRow>
                    <IonCol size="9" style={{ padding: "0" }}>
                      <div className={"text-normal"}>
                        Passenger at <b>{x}</b> is asking for:{" "}
                        <b>{requestList[x]}</b>
                      </div>
                    </IonCol>
                    <IonCol
                      size="3"
                      style={{ padding: "0", textAlign: "right" }}
                    >
                      <IonButton
                        fill="outline"
                        onClick={() => {
                          setRequestList(prevState => {
                            let newRequestList: { [key: string]: string } = {};
                            Object.keys(prevState)
                              .filter(y => y !== x)
                              .forEach(y => {
                                newRequestList[y] = requestList[y];
                              });
                            return newRequestList;
                          });
                          resolveService(x)
                            .then(msg => console.log(msg.Message))
                            .catch(msg => console.error(msg.Message));
                        }}
                      >
                        Resolve
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonContent>
      </IonModal>
    </>
  );
};

export default AircrewDiningPage;
