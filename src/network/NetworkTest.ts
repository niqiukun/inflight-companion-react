import { getMyOrder, placeCustomerOrder } from "./Customer";
import { getMenu, login } from "./Common";
import { getUserInfo, getOrderList, placeAircrewOrder } from "./Aircrew";

const networkTest = () => {
  login("31C", "")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getMenu()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getMyOrder()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  placeCustomerOrder("1", "1")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  login("3", "password3")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getUserInfo()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getOrderList()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  placeAircrewOrder("31C", "1", "1")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));
};

export default networkTest;
