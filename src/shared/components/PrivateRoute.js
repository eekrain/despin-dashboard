import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/user.action";

const PrivateRoute = ({ render: Component, ...rest }) => {
  const { dispatch } = rest;
  const { user, loginError } = rest;

  useEffect(() => {
    dispatch(userActions.isLoggedIn());
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
        // if (!loginError) {
        //   return <Component {...props} />;
        // } else {
        //   return (
        //     <Redirect
        //       to={{ pathname: "/auth/login", state: { from: props.location } }}
        //     />
        //   );
        // }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { loginError, isEverDoAuth } = state.authentication;
  return { loginError, isEverDoAuth };
};

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export { connectedPrivateRoute as PrivateRoute };
