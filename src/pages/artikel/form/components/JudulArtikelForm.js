import React from "react";
import { Form } from "react-bootstrap";
import WrapInput from "../../../../shared/components/formik/WrapInput";

function JudulArtikelForm({ label, name }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <WrapInput
        name={name}
        type="text"
        size="sm"
        placeholder={label}
        className="mb-3"
      />
    </Form.Group>
  );
}

export default JudulArtikelForm;
