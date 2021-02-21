import { combineReducers } from "redux";
import { authentication } from "./auth/authReducer";
import { users } from "./auth/userReducer";
import datta from "./datta/reducer";

const rootReducer = combineReducers({
  datta,
  authentication,
  users,
});

export default rootReducer;
