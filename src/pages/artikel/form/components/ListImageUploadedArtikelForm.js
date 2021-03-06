import React from "react";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";

function ListImageUploadedArtikelForm({ images }) {
  if (images?.length > 0) {
    return (
      <>
        {images.map(({ id, url, displayName }, index) => {
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
                    <Form.Check type="checkbox" label="Jadikan gambar utama" />
                  </Form.Group>
                  <Button variant="danger">
                    <i className="feather icon-trash-2" />
                    Hapus
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </>
    );
  } else {
    return (
      <div className="text-center">Belum ada gambar yang sudah diupload.</div>
    );
  }
}

export default ListImageUploadedArtikelForm;
