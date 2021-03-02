import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Router } from "react-router-dom";

import App from "./datta-able/App/index";
import * as serviceWorker from "./serviceWorker";
import stores from "./shared/stores";
import config from "./config";
import { history } from "./shared/helpers/history";

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  stores,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

const app = (
  <Provider store={store}>
    <Router history={history} basename={config.basename}>
      {/* basename="/datta-able" */}
      <App dispatch={store.dispatch} />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
