import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

const WrapInput = ({ ...props }) => {
  const [field] = useField(props);
  return <Form.Control {...field} {...props} />;
};

export default WrapInput;
