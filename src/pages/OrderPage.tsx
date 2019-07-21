import React from "react";
import { RouteComponentProps } from "react-router";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FoodInfo, FOOD_TYPES } from "../text/food";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";

interface Order {
  foodInfo: FoodInfo;
  quantity: number;
}

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  orderList: Order[];
}

class OrderPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    let orderList = this.getAllOrders();

    this.state = {
      localization: localLanguage,
      orderList: orderList
    };
  }

  getAllOrders(): Order[] {
    let result: Order[] = [];
    for (var foodType of FOOD_TYPES) {
      for (var foodInfo of foodType.FoodList) {
        let quantity = localStorage.getItem(foodInfo.foodName);
        if (quantity !== null && quantity !== "0") {
          let order = {
            foodInfo: foodInfo,
            quantity: +quantity
          };
          order = order as Order;
          result.push(order);
        }
      }
    }
    return result;
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/dining" />
            </IonButtons>
            <IonTitle>Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.state.orderList.map(order => {
              return (
                <IonItem
                  key={order.foodInfo.foodName}
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/food",
                      state: { foodInfo: order.foodInfo }
                    })
                  }
                >
                  <IonLabel>{order.foodInfo.foodName}</IonLabel>
                  <IonLabel>{order.quantity}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </>
    );
  }
}

export default OrderPage;
