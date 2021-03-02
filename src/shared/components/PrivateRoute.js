import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ render: Component, ...rest }) => {
  const { user, loginError } = rest;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && !loginError) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/auth/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { loginError, user } = state.authentication;
  return { loginError, user };
};

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export { connectedPrivateRoute as PrivateRoute };
