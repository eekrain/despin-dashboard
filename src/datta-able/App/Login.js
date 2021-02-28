import React from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import "../../../datta-able/assets/scss/style.scss";
import Aux from "../../../datta-able/hoc/_Aux";
import Breadcrumb from "../../../datta-able/App/layout/AdminLayout/Breadcrumb";
import { Formik, Form } from "formik";
import WrapInput from "../../../shared/components/formik/WrapInput";
import DisplayError from "../../../shared/components/formik/DisplayError";
import { Errlang } from "../../../shared/components/formik/ErrorLanguage";

function Login({ handleSubmit }) {
  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <Formik
              initialValues={{ user: "", password: "", remember: false }}
              validationSchema={Yup.object({
                user: Yup.string().required(
                  Errlang.required("username / email")
                ),
                password: Yup.string().required(Errlang.required("password")),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Login</h3>
                    <div className="mb-3 text-left">
                      <div className="input-group">
                        <WrapInput
                          name="user"
                          type="text"
                          className="form-control m-0"
                          placeholder="Username / Email"
                        />
                      </div>
                      <DisplayError
                        message={errors.user}
                        touched={touched.user}
                      />
                    </div>
                    <div className="mb-4 text-left">
                      <div className="input-group ">
                        <WrapInput
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                      <DisplayError
                        message={errors.password}
                        touched={touched.password}
                      />
                    </div>
                    <div className="form-group text-left">
                      <div className="checkbox checkbox-fill d-inline">
                        <WrapInput
                          type="checkbox"
                          name="remember"
                          id="remember"
                        />
                        <label htmlFor="remember" className="cr">
                          {" "}
                          Save credentials
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary shadow-2 mb-4"
                    >
                      Login
                    </button>
                    <p className="mb-2 text-muted">
                      Forgot password?{" "}
                      <NavLink to="/auth/reset-password-1">Reset</NavLink>
                    </p>
                    <pre>{JSON.stringify(values)}</pre>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default Login;
