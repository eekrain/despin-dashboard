import { Row, Col, Card, Form, Collapse } from "react-bootstrap";
import Aux from "../../datta-able/hoc/_Aux";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./artikelForm.css";
import { Formik, Form as FormikForm, Field } from "formik";
import TextInput from "../../components/formik/TextInput";
import TOOLBAR_OPTIONS from "../../editor.toolbar";
import DEMO from "../../store/constant";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function ArtikelCreate() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [accordionKey, setAccordionKey] = useState(1);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Aux>
      <Row>
        <Col>
          <Formik initialValues={{ judul: "", content: "" }}>
            {(props) => (
              <FormikForm>
                <Row>
                  <Col md={8}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Create Artikel</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form.Label>Judul Artikel</Form.Label>
                        <TextInput
                          name="judul"
                          type="text"
                          size="sm"
                          placeholder="Judul Artikel"
                          className="mb-3"
                        />
                        <Form.Label>Isi Artikel</Form.Label>
                        <Editor
                          editorState={editorState}
                          onChange={() => {
                            props.setFieldValue(
                              "content",
                              convertToRaw(editorState.getCurrentContent())
                            );
                          }}
                          wrapperClassName="demo-wrapper border rounded p-2 pb-3"
                          editorClassName="demo-editor"
                          onEditorStateChange={setEditorState}
                          placeholder="Isi Artikel..."
                          toolbar={TOOLBAR_OPTIONS}
                        />
                        <TextInput name="content" type="hidden" />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">
                          <div
                            href={DEMO.BLANK_LINK}
                            onClick={() =>
                              setAccordionKey(accordionKey !== 1 ? 1 : 0)
                            }
                            aria-controls="accordion1"
                            aria-expanded={accordionKey === 1}
                          >
                            Gambar
                          </div>
                        </Card.Title>
                      </Card.Header>
                      <Collapse in={accordionKey === 1}>
                        <div id="accordion1">
                          <Card.Body>
                            <h5>Gambar Utama</h5>
                            <div
                              {...getRootProps({
                                className: "dropzone container-drop-file",
                              })}
                            >
                              <input {...getInputProps()} />
                              <i
                                className="feather icon-upload-cloud"
                                style={{ fontSize: "50px" }}
                              />
                              <p>
                                Tarik dan masukkan file kedalam box / klik untuk
                                meng-unggah gambar.
                              </p>
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                            <hr className="mt-3" />
                            <h5>Gambar Tambahan</h5>
                            <div className="container-drop-file">
                              <i
                                className="feather icon-upload-cloud"
                                style={{ fontSize: "50px" }}
                              />
                              <p>
                                Tarik dan masukkan file kedalam box / klik untuk
                                meng-unggah gambar.
                              </p>
                            </div>
                          </Card.Body>
                        </div>
                      </Collapse>
                    </Card>
                  </Col>
                </Row>
                <pre>{JSON.stringify(props.values, null, 2)}</pre>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Aux>
  );
}

export default ArtikelCreate;
