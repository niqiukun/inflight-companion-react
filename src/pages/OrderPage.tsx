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
  IonLabel,
  IonNote,
  IonFooter
} from "@ionic/react";

export interface Order {
  foodInfo: FoodInfo;
  quantity: number;
}

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  orderList: Order[];
  total: number;
}

export function GetAllOrders(): Order[] {
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

class OrderPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    let orderList = GetAllOrders();
    let total = 0;
    for (var order of orderList) {
      total += order.quantity * order.foodInfo.price;
    }

    this.state = {
      localization: localLanguage,
      orderList: orderList,
      total: total
    };
  }

  componentWillReceiveProps() {
    let orderList = GetAllOrders();
    let total = 0;
    for (var order of orderList) {
      total += order.quantity * order.foodInfo.price;
    }

    this.setState({ orderList: orderList, total: total });
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
                  <IonLabel className="ion-text-wrap">
                    {order.foodInfo.foodName}
                  </IonLabel>
                  <IonNote className="order-page-number">
                    x{order.quantity}
                  </IonNote>
                  <IonNote className="order-page-number">
                    S${(order.foodInfo.price * order.quantity).toFixed(2)}
                  </IonNote>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonLabel>
              Total: S$
              {this.state.total.toFixed(2)}
            </IonLabel>
          </IonToolbar>
        </IonFooter>
      </>
    );
  }
}

export default OrderPage;
