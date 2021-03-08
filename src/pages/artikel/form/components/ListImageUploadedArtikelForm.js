import React from "react";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import RadioSetMainImage from "./RadioSetMainImage";

function ListImageUploadedArtikelForm({
  images,
  queryClient,
  handleSetDefaultImage,
  onChange,
  onBlur,
}) {
  if (images?.length > 0) {
    return (
      <>
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
                      <RadioSetMainImage
                        type="radio"
                        name="mainImageId"
                        value={id}
                        onChange={onChange}
                        onBlur={onBlur}
                        tempArtikelId={tempArtikelId}
                        handleSetDefaultImage={handleSetDefaultImage}
                        queryClient={queryClient}
                      />
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
      </>
    );
  } else {
    return (
      <div className="text-center">Belum ada gambar yang sudah diupload.</div>
    );
  }
}

export default ListImageUploadedArtikelForm;
