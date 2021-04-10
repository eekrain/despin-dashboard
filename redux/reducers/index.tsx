import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './CommonReducer';
import Dashboard from './Dashboard';
import UserList from './UserList';
import Ecommerce from './Ecommerce';
import Auth from './Auth';

const rootReducer = combineReducers({
  settings: Settings,
  auth: Auth,
  dashboard: Dashboard,
  common: Common,
  userList: UserList,
  ecommerce: Ecommerce,
});

export default rootReducer;
