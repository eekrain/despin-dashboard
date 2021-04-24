/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
import React, {useState} from 'react';
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

interface IArtikelFormCreateProps {
  categoryType: string;
  categorySlug: string;
}

export interface ICreateArtikelFormikInitValues {
  tempArtikelId: string;
  categorySlug: string;
  title: string;
  body: string;
  mainImageId: string;
}

const CreateArtikel = ({
  categoryType,
  categorySlug,
}: IArtikelFormCreateProps) => {
  const [artikelId] = useState(nanoid());
  const [appTitle] = useState('Buat Artikel Baru');
  const [editorKey, setEditorKey] = useState(nanoid());
  const router = useRouter();
  const classes = useStyles();
  const redirectToArtikelList = async () => {
    await router.push(
      `/admin-web/artikel?activeArtikelType=${categoryType}&activeCategory=${categorySlug}`,
      '/admin-web/artikel',
    );
  };

  const queryClient = useQueryClient();

  const imagesUploaded = useQuery(`imagesUploadedArtikel-${artikelId}`, () =>
    ArtikelService.create.getNewArtikelUploadedImages(artikelId),
  );

  const uploadMutation = useMutation(ArtikelService.create.handleUpload);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleOnDrop = async (acceptedFiles: any[]) => {
    await uploadMutation.mutateAsync({artikelId, queryClient, acceptedFiles});
  };

  const handleDeleteImage = async (hashedImageId: string) => {
    await ArtikelService.create.handleDeleteImage({artikelId, hashedImageId});
    await queryClient.invalidateQueries(`imagesUploadedArtikel-${artikelId}`);
  };

  const clearEditor = () => {
    setEditorKey(nanoid());
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Formik
        validateOnChange={true}
        initialValues={{
          [artikelFormFormikFieldNameEnum.tempArtikelId]: artikelId,
          [artikelFormFormikFieldNameEnum.categorySlug]: categorySlug,
          [artikelFormFormikFieldNameEnum.title]: '',
          [artikelFormFormikFieldNameEnum.body]: '',
          [artikelFormFormikFieldNameEnum.mainImageId]: '',
        }}
        onSubmit={async (data, {setSubmitting, resetForm}) => {
          ArtikelService.create.handleFormikSubmission(
            () => ArtikelService.create.handleSubmit(data),
            () => {
              clearEditor();
              resetForm();
            },
            setSubmitting,
            redirectToArtikelList,
          );
        }}>
        {({values: formikValues, setFieldValue, dirty}) => (
          <>
            <WarnIfUnsavedChanges unsavedChanges={dirty} />
            <Form className={classes.formRoot}>
              <ArtikelFormContextProvider
                value={{
                  mode: ArtikelFormModeEnum.CREATE,
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
            </Form>
          </>
        )}
      </Formik>
    </AppAnimate>
  );
};

export default CreateArtikel;
