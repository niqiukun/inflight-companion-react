import {
  MessageReponse,
  API_BASE_URL,
  getRequest,
  postRequest
} from "./Common";

export const getUserInfo = (): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    getRequest<MessageReponse>(API_BASE_URL + "aircrew/userInfo")
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const getOrderList = (): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    getRequest<MessageReponse>(API_BASE_URL + "aircrew/orderList")
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const placeAircrewOrder = (
  userId: string,
  dishId: string,
  quantity: string
): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(API_BASE_URL + "customer/placeOrder", {
      userId: userId,
      dishId: dishId,
      quantity: quantity
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
