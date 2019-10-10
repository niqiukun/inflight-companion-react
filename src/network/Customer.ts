import { postRequest, MessageReponse, apiBaseUrl } from "./Common";

export const customerLogin = (
  username: string,
  password: string
): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>(apiBaseUrl + "login", {
      username: username,
      password: password
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
