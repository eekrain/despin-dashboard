/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
import React, {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import ArtikelForm from './form';
import AppAnimate from '../../../../../@crema/core/AppAnimate';
import {Form, Formik} from 'formik';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import {makeStyles} from '@material-ui/core';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import ArtikelService from '../../../../../@crema/services/despin-api/artikel/artikel.service';
import WarnIfUnsavedChanges from '../../../../../shared/components/WarnIfUnsavedChanges';
import {useRouter} from 'next/router';
import {IUpdateArtikelProps} from '../../../../../pages/admin-web/artikel/update/[...category]';
import {artikelFormFormikFieldNameEnum} from '../dto/artikel-form-formik-field-name.enum';
import {
  ArtikelFormContextProvider,
  ArtikelFormModeEnum,
} from '../contexts/artikel-form.context';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    textAlign: 'left',
  },
  myTextFieldRoot: {
    width: '100%',
  },
}));

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface IArtikelUpdateFormikInitValue {
  hashedArtikelId: any;
  categorySlug: string;
  title: any;
  body: any;
  mainImageId: any;
}

const UpdateArtikel = ({
  categoryType,
  categorySlug,
  artikelData,
}: IUpdateArtikelProps) => {
  const [artikelId] = useState(artikelData.data!.id);
  const [appTitle] = useState('Edit Artikel');
  const [editorKey, setEditorKey] = useState(nanoid());
  const router = useRouter();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const redirectToArtikelList = async () => {
    await router.push(
      `/admin-web/artikel?activeArtikelType=${categoryType}&activeCategory=${categorySlug}`,
      '/admin-web/artikel',
    );
  };

  useEffect(() => {
    const redirect = async () => {
      await redirectToArtikelList();
    };
    if (!artikelData.isSuccess) redirect();
  }, []);

  const imagesUploaded = useQuery(
    `imagesUploadedArtikel-${artikelData.data?.id}`,
    () => ArtikelService.update.getArtikelUploadedImages(artikelData.data?.id),
  );

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const uploadMutation = useMutation(ArtikelService.update.handleUpload);
  const handleOnDrop = async (acceptedFiles: any[]) => {
    await uploadMutation.mutateAsync({artikelId, queryClient, acceptedFiles});
  };

  const handleDeleteImage = async (hashedImageId: string) => {
    await ArtikelService.update.handleDeleteImage({artikelId, hashedImageId});
    await queryClient.invalidateQueries(
      `imagesUploadedArtikel-${artikelData.data?.id}`,
    );
  };

  const clearEditor = () => {
    setEditorKey(nanoid());
  };

  const [formikInitialValues] = useState({
    [artikelFormFormikFieldNameEnum.hashedArtikelId]: artikelId,
    [artikelFormFormikFieldNameEnum.categorySlug]: categorySlug,
    [artikelFormFormikFieldNameEnum.title]: artikelData.data!.ArtikelContent[0]!
      .title,
    [artikelFormFormikFieldNameEnum.body]: artikelData.data!.ArtikelContent[0]!
      .body,
    [artikelFormFormikFieldNameEnum.mainImageId]: artikelData.data?.mainImageId,
  });

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Formik
        validateOnChange={true}
        initialValues={formikInitialValues}
        onSubmit={async (data, {setSubmitting, resetForm}) => {
          const newTitle = data.title;
          const newBody = data.body;
          const newMainImageId = data.mainImageId;
          const isNeedUpdate =
            newTitle !== formikInitialValues.title &&
            newBody !== formikInitialValues.body &&
            newMainImageId !== formikInitialValues.mainImageId
              ? true
              : false;
          ArtikelService.update.handleFormikSubmission(
            isNeedUpdate,
            () => ArtikelService.update.handleSubmit(data),
            () => {
              clearEditor();
              resetForm();
            },
            setSubmitting,
            redirectToArtikelList,
          );
        }}>
        {({values: formikValues, dirty}) => (
          <>
            <WarnIfUnsavedChanges unsavedChanges={dirty} />
            <Form className={classes.formRoot}>
              <ArtikelFormContextProvider
                value={{
                  mode: ArtikelFormModeEnum.UPDATE,
                  artikelId,
                  categorySlug,
                  appTitle,
                  imagesUploaded,
                  uploadMutation,
                  handleOnDrop,
                  editorKey,
                  clearEditor,
                  redirectToArtikelList,
                  handleDeleteImage,
                }}>
                <ArtikelForm />
              </ArtikelFormContextProvider>
              <pre>{JSON.stringify(formikValues, undefined, 2)}</pre>
              <pre>{JSON.stringify(artikelData, undefined, 2)}</pre>
            </Form>
          </>
        )}
      </Formik>
    </AppAnimate>
  );
};

export default UpdateArtikel;
