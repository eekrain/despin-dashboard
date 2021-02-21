import React from "react";

const Login = React.lazy(() => import("./pages/auth/Login/LoginContainer"));
const SignUp1 = React.lazy(() =>
  import("./datta-able/Demo/Authentication/SignUp/SignUp1")
);
const Signin1 = React.lazy(() =>
  import("./datta-able/Demo/Authentication/SignIn/SignIn1")
);

const route = [
  { path: "/auth/login", exact: true, name: "Login", component: Login },
  { path: "/auth/signup-1", exact: true, name: "Signup 1", component: SignUp1 },
  { path: "/auth/signin-1", exact: true, name: "Signin 1", component: Signin1 },
];

export default route;
