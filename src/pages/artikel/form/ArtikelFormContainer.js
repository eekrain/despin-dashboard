import React, { useState } from "react";
import ArtikelForm from "./ArtikelForm";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import TOOLBAR_OPTIONS from "../../../editor.toolbar";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const handleUpload = (tempArtikelId, acceptedFiles, queryClient) => {
  let data = new FormData();
  data.append("tempArtikelId", tempArtikelId);
  acceptedFiles.forEach((file) => {
    data.append("images", file, file.name);
  });

  return axios
    .post("http://localhost:3000/api/v1/artikel/uploadImages", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    })
    .then((response) => {
      queryClient.invalidateQueries("imagesUploaded");
      console.log(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 27 ~ .then ~ response",
        response
      );
      return response;
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: create.js ~ line 42 ~ ArtikelCreate ~ error",
        error
      );
    });
};

const getNewArtikelUploadedImages = (tempArtikelId) => {
  return axios
    .get(`http://localhost:3000/api/v1/artikel/uploadImages/${tempArtikelId}`, {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      console.log(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 48 ~ .then ~ response",
        response
      );
      return response;
    });
};

const handleSetDefaultImage = (
  tempArtikelId,
  hashedTempImageId,
  queryClient
) => {
  const dataSetDefaultImage = { tempArtikelId, hashedTempImageId };
  return axios
    .patch(
      "http://localhost:3000/api/v1/artikel/setTempImageAsMainImage",
      dataSetDefaultImage,
      {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      queryClient.invalidateQueries("imagesUploaded");
      return response;
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 76 ~ .then ~ error",
        error
      );
    });
};

const ArtikelFormContainer = () => {
  const [tempArtikelId] = useState(uuidv4());
  const queryClient = useQueryClient();
  const imagesUploaded = useQuery("imagesUploaded", () =>
    getNewArtikelUploadedImages(tempArtikelId)
  );
  const uploadMutation = useMutation(
    ({ tempArtikelId, acceptedFiles, queryClient }) =>
      handleUpload(tempArtikelId, acceptedFiles, queryClient)
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [accordionKey, setAccordionKey] = useState(1);
  const formikInitialValues = {
    judul: "",
    content: {},
    mainImageId: "",
  };

  return (
    <ArtikelForm
      tempArtikelId={tempArtikelId}
      formikInitialValues={formikInitialValues}
      Editor={Editor}
      TOOLBAR_OPTIONS={TOOLBAR_OPTIONS}
      editorState={editorState}
      setEditorState={setEditorState}
      convertToRaw={convertToRaw}
      accordionKey={accordionKey}
      setAccordionKey={setAccordionKey}
      queryClient={queryClient}
      imagesUploaded={imagesUploaded}
      uploadMutation={uploadMutation}
      handleSetDefaultImage={handleSetDefaultImage}
    />
  );
};

export default ArtikelFormContainer;
