import userService from "../services/user.service";
import { userConstants } from "../stores/auth/userConstants";
import { history } from "../helpers/history";

export const userActions = {
  login,
  isLoggedIn,
};

function login(userCredentials) {
  const { user } = userCredentials;
  return (dispatch) => {
    dispatch(request({ user }));

    userService.login(userCredentials).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function isLoggedIn() {
  return (dispatch) => {
    dispatch(request({ user: "check is logged in" }));

    userService.isLoggedIn().then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
}

function request(user) {
  return { type: userConstants.LOGIN_REQUEST, user };
}
function success(user) {
  return { type: userConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
  return { type: userConstants.LOGIN_FAILURE, error };
}
