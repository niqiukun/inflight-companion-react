export const getRequest = async <T>(request: RequestInfo): Promise<T> => {
  return new Promise(resolve => {
    fetch(request, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer"
    })
      .then(response => response.json())
      .then(body => {
        resolve(body);
      });
  });
};

export const postRequest = async <T>(
  request: RequestInfo,
  params: any //any json structure
): Promise<T> => {
  return new Promise(resolve => {
    fetch(request, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(params),
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer"
    })
      .then(response => response.json())
      .then(body => resolve(body as T));
  });
};

export const customerLogin = (
  username: string,
  password: string
): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    postRequest<MessageReponse>("http://localhost:3000/api/login", {
      username: username,
      password: password
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export interface MessageReponse {
  Message: string;
}
