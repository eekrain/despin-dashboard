import inMemoryJWT from "../helpers/inMemoryJWTManager";
import config from "../../config";
import axios from "axios";

const authService = {
  setRefreshTokenEndpoint: () => {
    inMemoryJWT.setRefreshTokenEndpoint(
      `${config.DESPIN_API_URL}/auth/admin/refresh`
    );
  },

  login: ({ username, password }) => {
    const data = { username, password };
    axios
      .post(`${config.DESPIN_API_URL}/auth/admin/login`, data, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        const { token, tokenExpiry } = response?.data?.data?.payload;
        const { user } = response?.data?.data?.user;
        inMemoryJWT.setToken(token, tokenExpiry);
        return user;
      });
  },

  logout: () => {
    const request = new Request(`${config.DESPIN_API_URL}/logout`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include",
    });
    inMemoryJWT.ereaseToken();

    return fetch(request).then(() => "/login");
  },

  checkAuth: () => {
    return inMemoryJWT.waitForTokenRefresh().then(() => {
      return inMemoryJWT.getToken()
        ? Promise.resolve(true)
        : Promise.reject("Not logged in");
    });
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      inMemoryJWT.ereaseToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    return inMemoryJWT.waitForTokenRefresh().then(() => {
      return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
    });
  },
};

export default authService;
