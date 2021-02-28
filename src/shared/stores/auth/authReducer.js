import { userConstants } from "./userConstants";

const initialState = {
  loggedIn: false,
  loginError: false,
  isEverDoAuth: false,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        isEverDoAuth: true,
      };
    case userConstants.LOGIN_FAILURE:
      return { loginError: true, isEverDoAuth: true };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
