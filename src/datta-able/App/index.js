import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { PublicRoute } from "../../shared/components/PublicRoute";

import "../../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../../route";
import authService from "../../shared/services/auth.service.bkp";
import { userActions } from "../../shared/actions/user.action";
import config from "../../config";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  componentDidMount() {
    authService.setRefreshTokenEndpoint();
    if (config.authenticaticationService) {
      this.props.dispatch(userActions.isLoggedIn());
    }
  }

  render() {
    const menu = routes.map((route, index) => {
      if (config.authenticaticationService) {
        return route.component ? (
          <PublicRoute
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => <route.component {...props} />}
          />
        ) : null;
      } else {
        return route.component ? (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => <route.component {...props} />}
          />
        ) : null;
      }
    });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              <Route path="/" component={AdminLayout} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

export default App;
