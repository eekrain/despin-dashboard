import { convertToRaw } from "draft-js";
import React from "react";
import { Form } from "react-bootstrap";

function ContentArtikelForm({
  label,
  name,
  setFieldValue,
  Editor,
  editorState,
  setEditorState,
  TOOLBAR_OPTIONS,
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Editor
        editorState={editorState}
        onChange={() => {
          setFieldValue(name, convertToRaw(editorState.getCurrentContent()));
        }}
        wrapperClassName="demo-wrapper border rounded p-2 pb-3"
        editorClassName="demo-editor"
        onEditorStateChange={setEditorState}
        placeholder={`${label}...`}
        toolbar={TOOLBAR_OPTIONS}
      />
    </Form.Group>
  );
}

export default ContentArtikelForm;
