import React, { useState } from "react";
import ArtikelForm from "./form/ArtikelForm";
import { v4 as uuidv4 } from "uuid";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import TOOLBAR_OPTIONS from "../../editor.toolbar";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import config from "../../config";

const handleUpload = (artikelId, acceptedFiles, queryClient) => {
  let data = new FormData();
  data.append("artikelId", artikelId);
  acceptedFiles.forEach((file) => {
    data.append("images", file, file.name);
  });

  return axios
    .post(`${config.DESPIN_API_URL}/v1/artikel/uploadImages`, data, {
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

const getNewArtikelUploadedImages = (artikelId) => {
  return axios
    .get(`${config.DESPIN_API_URL}/v1/artikel/uploadImages/${artikelId}/TEMP`, {
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

const handleSetDefaultImage = (artikelId, hashedTempImageId, queryClient) => {
  const dataSetDefaultImage = { artikelId, hashedTempImageId, type: "TEMP" };
  return axios
    .patch(
      `${config.DESPIN_API_URL}/v1/artikel/setAsMainImage`,
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

const CreateArtikelContainer = (props) => {
  const categorySlug = props.match.params.kategori;
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (formikValue) => {
    const response = await axios.post(
      `${config.DESPIN_API_URL}/v1/artikel`,
      formikValue,
      {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      }
    );
    console.log(
      "🚀 ~ file: CreateArtikel.container.js ~ line 98 ~ handleSubmit ~ response",
      response
    );
    setRedirect(`/admin-web/artikel/${categorySlug}`);
  };
  const [artikelId] = useState(uuidv4());
  const queryClient = useQueryClient();
  const imagesUploaded = useQuery("imagesUploaded", () =>
    getNewArtikelUploadedImages(artikelId)
  );
  const uploadMutation = useMutation(
    ({ artikelId, acceptedFiles, queryClient }) =>
      handleUpload(artikelId, acceptedFiles, queryClient)
  );
  const formTitle = "Buat Artikel Baru";

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [accordionKey, setAccordionKey] = useState(1);
  const formikInitialValues = {
    artikelId,
    categorySlug,
    title: "",
    body: {},
    mainImageId: "",
  };

  if (redirect) {
    return <Redirect push exact to={redirect} />;
  }

  return (
    <ArtikelForm
      artikelId={artikelId}
      formTitle={formTitle}
      formikInitialValues={formikInitialValues}
      handleSubmit={handleSubmit}
      Editor={Editor}
      TOOLBAR_OPTIONS={TOOLBAR_OPTIONS}
      editorState={editorState}
      setEditorState={setEditorState}
      accordionKey={accordionKey}
      setAccordionKey={setAccordionKey}
      queryClient={queryClient}
      imagesUploaded={imagesUploaded}
      uploadMutation={uploadMutation}
      handleSetDefaultImage={handleSetDefaultImage}
    />
  );
};

export default CreateArtikelContainer;
