import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

const TextInput = ({ ...props }) => {
  const [field] = useField(props);
  console.log(field);
  return <Form.Control {...field} {...props} />;
};

export default TextInput;
