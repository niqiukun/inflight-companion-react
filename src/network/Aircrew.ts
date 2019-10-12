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

export const aircrewPlaceOrder = (
  userId: string,
  dishId: string,
  quantity: string
): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(API_BASE_URL + "aircrew/placeOrder", {
      userId: userId,
      dishId: dishId,
      quantity: quantity
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

interface Order {
  orderId: string;
  quantity: string;
}

export const serveOrderList = (orderList: Order[]): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(API_BASE_URL + "aircrew/serveOrderList", {
      orderList: orderList
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

interface Service {
  serviceId: string;
  userId: string;
  serviceContent: string;
}

export const getServiceList = (): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    getRequest<MessageReponse>(API_BASE_URL + "aircrew/getServiceList")
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const serveOrder = (userId: string): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(API_BASE_URL + "aircrew/serveOrderByUserId", {
      userId: userId
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
