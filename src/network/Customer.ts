import {
  postRequest,
  MessageReponse,
  API_BASE_URL,
  getRequest
} from "./Common";

export const getMyOrder = (): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    getRequest<MessageReponse>(API_BASE_URL + "customer/myOrder")
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const customerPlaceOrder = (
  dishId: string,
  quantity: string
): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(API_BASE_URL + "customer/placeOrder", {
      dishId: dishId,
      quantity: quantity
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
