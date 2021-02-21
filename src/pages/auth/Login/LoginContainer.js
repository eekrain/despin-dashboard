import React from "react";
import authService from "../../../shared/services/auth.service";
import Login from "./Login";

function LoginContainer() {
  const handleSubmit = ({ user, password }) => {
    authService.login({ username: user, password });
  };

  return <Login handleSubmit={handleSubmit} />;
}

export default LoginContainer;
