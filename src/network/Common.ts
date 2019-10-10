export interface MessageReponse {
  Message: string;
}

export const apiBaseUrl = "http://localhost:3000/api/";

export const getRequest = async <T>(request: RequestInfo): Promise<T> => {
  return new Promise(resolve => {
    fetch(request, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
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
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(params),
      redirect: "follow",
      referrer: "no-referrer"
    })
      .then(response => response.json())
      .then(body => resolve(body as T));
  });
};

export const getMenu = (): Promise<MessageReponse> => {
  return new Promise((resolve, reject) => {
    getRequest<MessageReponse>(apiBaseUrl + "getMenu")
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
