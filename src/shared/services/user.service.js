import inMemoryJWT from "../helpers/inMemoryJWTManager";
import config from "../../config";
import axios from "axios";
axios.defaults.withCredentials = true;

const userService = {
  setRefreshTokenEndpoint: () => {
    inMemoryJWT.setRefreshTokenEndpoint(
      `${config.DESPIN_API_URL}/auth/admin/refresh`
    );
  },
  login: (userCredentials) => {
    return axios
      .post(`${config.DESPIN_API_URL}/auth/admin/login`, userCredentials, {
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
        const { token, tokenExpiry } = response.data.data.payload;
        const user = response.data.data.user;
        inMemoryJWT.setToken(token, tokenExpiry);
        return user;
      });
  },
  isLoggedIn: () => {
    return axios
      .get(`${config.DESPIN_API_URL}/auth/admin/refresh`, {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        const { token, tokenExpiry } = response.data.data.payload;
        const user = response.data.data.user;
        inMemoryJWT.setToken(token, tokenExpiry);
        return user;
      });
  },
};

export default userService;
