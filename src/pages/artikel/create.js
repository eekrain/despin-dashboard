import { Row, Col, Card, Form, Collapse } from "react-bootstrap";
import Aux from "../../datta-able/hoc/_Aux";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./artikelForm.css";
import { Formik, Form as FormikForm } from "formik";
import WrapInput from "../../shared/components/formik/WrapInput";
import TOOLBAR_OPTIONS from "../../editor.toolbar";
import DEMO from "../../shared/stores/datta/constant";
import { useDropzone } from "react-dropzone";
import FormData from "form-data";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useUnsavedChangesWarning from "../../shared/hooks/useUnsavedChangesWarning";
import FormikEffect from "../../shared/hooks/FormikEffect";
import * as Yup from "yup";

function ArtikelCreate() {
  const [createId] = useState(uuidv4());
  const [Prompt, setDirty, setPristine] = useUnsavedChangesWarning(
    "Artikel belum disimpan, jika refresh maka data form akan hilang. Yakin untuk refresh?"
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [accordionKey, setAccordionKey] = useState(1);
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jph, image/jpeg, image/png, image/gif",
    onDrop: (acceptedFiles) => {
      let data = new FormData();
      data.append("tempArtikelId", createId);
      acceptedFiles.forEach((file) => {
        data.append("images[]", file, file.name);
      });

      axios
        .post("http://localhost:3000/api/artikel/uploadImage", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          console.log(response);
          setImages([...images]);
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: create.js ~ line 42 ~ ArtikelCreate ~ error",
            error
          );
          //handle error
        });
    },
  });

  return (
    <Aux>
      {Prompt}
      <Row>
        <Col>
          <Formik
            initialValues={{ judul: "", content: "" }}
            render={(props) => (
              <FormikForm>
                <FormikEffect
                  onChange={(currentFormikState, nextFormikState) => {
                    console.log(props.dirty);
                    if (props.dirty) {
                      setDirty();
                    } else {
                      setPristine();
                    }
                  }}
                />
                <Row>
                  <Col md={8}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Create Artikel</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form.Label>Judul Artikel</Form.Label>
                        <WrapInput
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
                        <WrapInput name="content" type="hidden" />
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
          ></Formik>
        </Col>
      </Row>
    </Aux>
  );
}

export default ArtikelCreate;
