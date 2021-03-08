import { Field, Formik, Form as FormikForm } from "formik";
import React, { useState } from "react";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import WrapInput from "../../../../shared/components/formik/WrapInput";

function ListImageUploadedArtikelForm({
  images,
  queryClient,
  handleSetDefaultImage,
}) {
  const setDefaultImage = (event) => {
    console.log(event.target.checked);
  };

  if (images?.length > 0) {
    return (
      <>
        <Formik initialValues={{ dataDefaultImage: "" }}>
          {(props) => (
            <FormikForm>
              {images.map(
                ({ id, tempArtikelId, url, displayName, isMain }, index) => {
                  const dataSetMainImage = {
                    tempArtikelId,
                    hashedTempImageId: id,
                  };
                  return (
                    <Fragment key={id}>
                      {index > 0 && <hr className="mt-2" />}
                      <div className="d-flex align-items-center justify-content-between">
                        <div style={{ width: "100px" }}>
                          <img
                            src={url}
                            className="d-block mx-auto"
                            style={{ maxWidth: "100px", maxHeight: "60px" }}
                            alt={`uploaded ${displayName}`}
                          />
                          <div className="text-center">{displayName}</div>
                        </div>
                        <div>
                          <Form.Group controlId="formBasicChecbox">
                            <WrapInput type="radio" label="anjing" />
                          </Form.Group>
                          <Button variant="danger">
                            <i className="feather icon-trash-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </Fragment>
                  );
                }
              )}
              <pre>{JSON.stringify(props.values)}</pre>
            </FormikForm>
          )}
        </Formik>
      </>
    );
  } else {
    return (
      <div className="text-center">Belum ada gambar yang sudah diupload.</div>
    );
  }
}

export default ListImageUploadedArtikelForm;
