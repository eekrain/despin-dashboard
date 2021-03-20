import React from "react";
import { Form } from "react-bootstrap";

function RadioSetMainImage({
  onChange,
  tempArtikelId,
  handleSetDefaultImage,
  queryClient,
  ...rest
}) {
  return (
    <Form.Check
      onChange={(event) => {
        console.log("🚀 ~ file: RadioSetMainImage.js ~ line 14 ~ event", event);
        event.persist();
        handleSetDefaultImage(
          tempArtikelId,
          event.target.value,
          queryClient
        ).then((response) => {
          console.log(
            "🚀 ~ file: RadioSetMainImage.js ~ line 16 ~ handleSetDefaultImage ~ response",
            response
          );
          onChange(event);
        });
      }}
      {...rest}
    />
  );
}

export default RadioSetMainImage;
