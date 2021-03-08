import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Card, Col, Row, Collapse } from "react-bootstrap";
import Aux from "../../../datta-able/hoc/_Aux";
import WrapInput from "../../../shared/components/formik/WrapInput";
import FormikEffect from "../../../shared/hooks/FormikEffect";
import useUnsavedChangesWarning from "../../../shared/hooks/useUnsavedChangesWarning";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ArtikelForm.css";
import { DropzoneFormik } from "../../../shared/components/formik/Dropzone/index";
import { acceptedFileExtension } from "../../../shared/components/formik/Dropzone/acceptedFileExtension";

import DEMO from "../../../shared/stores/datta/constant";
import JudulArtikelForm from "./components/JudulArtikelForm";
import ContentArtikelForm from "./components/ContentArtikelForm";
import ListImageUploadedArtikelForm from "./components/ListImageUploadedArtikelForm";

function ArtikelForm({
  tempArtikelId,
  formikInitialValues,
  Editor,
  TOOLBAR_OPTIONS,
  editorState,
  setEditorState,
  convertToRaw,
  accordionKey,
  setAccordionKey,
  queryClient,
  imagesUploaded,
  uploadMutation,
  handleSetDefaultImage,
}) {
  const [Prompt, setDirty, setPristine] = useUnsavedChangesWarning();

  return (
    <Aux>
      {Prompt}
      <Row>
        <Col>
          <Formik initialValues={formikInitialValues}>
            {(props) => (
              <FormikForm>
                <Row>
                  <Col md={8}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Create Artikel</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <JudulArtikelForm label="Judul Artikel" name="judul" />
                        <ContentArtikelForm
                          label="Isi Artikel"
                          name="content"
                          setFieldValue={props.setFieldValue}
                          Editor={Editor}
                          editorState={editorState}
                          setEditorState={setEditorState}
                          TOOLBAR_OPTIONS={TOOLBAR_OPTIONS}
                        />
                        <WrapInput name="content" type="hidden" />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card>
                      <Card.Header>
                        <Card.Title
                          as="h5"
                          className="d-block w-100"
                          style={{ cursor: "pointer" }}
                        >
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
                            <ListImageUploadedArtikelForm
                              images={imagesUploaded?.data?.data}
                              queryClient={queryClient}
                              handleSetDefaultImage={handleSetDefaultImage}
                            />
                            <hr className="mt-3" />
                            <DropzoneFormik
                              maxFiles={0}
                              acceptedFileExtension={
                                acceptedFileExtension.image
                              }
                              queryClient={queryClient}
                              uploadMutation={uploadMutation}
                              tempArtikelId={tempArtikelId}
                            />
                          </Card.Body>
                        </div>
                      </Collapse>
                    </Card>
                  </Col>

                  <pre>{JSON.stringify(props.values, null, 2)}</pre>
                </Row>

                <FormikEffect
                  onChange={(currentFormikState, nextFormikState) => {
                    if (props.dirty) {
                      setDirty();
                    } else {
                      setPristine();
                    }
                  }}
                />
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Aux>
  );
}

export default ArtikelForm;
