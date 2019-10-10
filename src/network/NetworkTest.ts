import { getMyOrder, customerPlaceOrder } from "./Customer";
import { getMenu, login } from "./Common";
import {
  getUserInfo,
  getOrderList,
  aircrewPlaceOrder,
  serveOrderList
} from "./Aircrew";

function sleep(miliseconds: number) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}

const networkTest = () => {
  login("31C", "")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  getMenu()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  getMyOrder()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  customerPlaceOrder("1", "1")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  login("3", "password3")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  getUserInfo()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  getOrderList()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  aircrewPlaceOrder("31C", "1", "1")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  sleep(200);

  serveOrderList([{ orderId: "2019-7-3-1-1", quantity: "1" }])
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));
};

export default networkTest;
