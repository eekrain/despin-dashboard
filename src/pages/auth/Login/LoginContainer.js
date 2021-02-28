import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../../shared/actions/user.action";
import Login from "./Login";

const LoginContainer = (props) => {
  const handleSubmit = (userCredentials) => {
    const { dispatch } = props;

    dispatch(userActions.login(userCredentials));
  };

  return <Login handleSubmit={handleSubmit} />;
};

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  return { loggingIn };
};

const connectedLoginContainer = connect(mapStateToProps)(LoginContainer);

export default connectedLoginContainer;
