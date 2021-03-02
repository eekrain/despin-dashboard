import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({ render: Component, ...rest }) => {
  const { user, loginError } = rest;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && !loginError) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { loginError, user } = state.authentication;
  return { loginError, user };
};

const connectedPublicRoute = connect(mapStateToProps)(PublicRoute);

export { connectedPublicRoute as PublicRoute };
