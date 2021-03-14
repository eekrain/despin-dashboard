import React, { useState } from "react";
import ArtikelForm from "./form/ArtikelForm";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import TOOLBAR_OPTIONS from "../../editor.toolbar";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import ArtikelService from "../../shared/services/artikel.service";
import PageLoading from "../../shared/components/PageLoading";
import config from "../../config";

const UpdateArtikelContainer = (props) => {
  const categorySlug = props.match.params.kategori;
  const artikelId = props.match.params.hashedArtikelId;
  const queryClient = useQueryClient();

  const [redirect, setRedirect] = useState(false);
  const [everSetContent, setEverSetContent] = useState(false);

  const artikelData = useQuery("artikelData", () =>
    ArtikelService.getArtikelDataByHashedId(artikelId)
  );

  const handleSubmit = async (formikValue) => {
    await axios
      .patch(`${config.DESPIN_API_URL}/v1/artikel`, formikValue, {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: ArtikelFormContainer.js ~ line 94 ~ handleSubmit ~ response",
          response
        );
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: ArtikelFormContainer.js ~ line 101 ~ .then ~ error",
          error
        );
      });
    queryClient.removeQueries("artikelData", { exact: true });
    setRedirect(true);
  };
  const imagesUploaded = useQuery("imagesUploaded", () =>
    ArtikelService.update.getNewArtikelUploadedImages(artikelId)
  );
  const uploadMutation = useMutation(
    ({ artikelId, acceptedFiles, queryClient }) =>
      ArtikelService.update.handleUpload(artikelId, acceptedFiles, queryClient)
  );
  const formTitle = "Updte Artikel Baru";

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formikInitialValues, setFormikInitialValues] = useState({});

  const [accordionKey, setAccordionKey] = useState(1);

  if (redirect) return <Redirect push to="/admin-web/artikel" />;

  if (artikelData.isLoading) return <PageLoading />;

  if (!everSetContent) {
    setFormikInitialValues({
      artikelId,
      categorySlug,
      title: artikelData.data.ArtikelContent[0].title,
      body: artikelData.data.ArtikelContent[0].body,
    });
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(artikelData.data.ArtikelContent[0].body)
      )
    );
    setEverSetContent(true);
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
      handleSetDefaultImage={ArtikelService.update.handleSetDefaultImage}
    />
  );
};

export default UpdateArtikelContainer;
