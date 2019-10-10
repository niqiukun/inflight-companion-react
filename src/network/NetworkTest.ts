import { customerLogin, getMyOrder } from "./Customer";
import { getMenu } from "./Common";

const networkTest = () => {
  customerLogin("31C", "")
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getMenu()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));

  getMyOrder()
    .then(msg => console.log(msg))
    .catch(msg => console.error(msg));
};

export default networkTest;
