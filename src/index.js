import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { BrowserRouter } from "react-router-dom";

import App from "./datta-able/App/index";
import * as serviceWorker from "./serviceWorker";
import stores from "./shared/stores";
import { history } from "./shared/helpers/history";
import config from "./config";

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  stores,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

const app = (
  <Provider store={store}>
    <BrowserRouter history={history} basename={config.basename}>
      {/* basename="/datta-able" */}
      <App dispatch={store.dispatch} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
