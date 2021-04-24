import {Box, makeStyles} from '@material-ui/core';
import {ArrowBackIosOutlined} from '@material-ui/icons';
import {Editor} from '@tinymce/tinymce-react';
import axios from 'axios';
import {useFormikContext} from 'formik';
import React, {useContext, useState} from 'react';
import {useQueryClient} from 'react-query';
import {AppContext} from '../../../../../../../@crema';
import AppCard from '../../../../../../../@crema/core/AppCard';
import ArtikelService from '../../../../../../../@crema/services/despin-api/artikel/artikel.service';
import FormikTextField from '../../../../../../../shared/components/Formik/FormikTextField';
import {Fonts, ThemeMode} from '../../../../../../../shared/constants/AppEnums';
import AppContextPropsType, {
  CremaTheme,
} from '../../../../../../../types/AppContextPropsType';
import ArtikelFormContext, {
  ArtikelFormModeEnum,
} from '../../../contexts/artikel-form.context';
import {artikelFormFormikFieldNameEnum} from '../../../dto/artikel-form-formik-field-name.enum';
import {IArtikelFormFormikValues} from '../../../dto/artikel-form-formik-value.dto';

const useStyles = makeStyles((theme: CremaTheme) => ({
  myTextFieldRoot: {
    width: '100%',
  },
}));

const ArtikelContentEditor = () => {
  const classes = useStyles();
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const {editorKey, artikelId} = useContext(ArtikelFormContext);
  const {
    setFieldValue,
    values: formikValues,
  } = useFormikContext<IArtikelFormFormikValues>();
  const queryClient = useQueryClient();

  const [initEditorValue] = useState(
    formikValues.body !== ''
      ? formikValues.body
      : '<p>Tulis artikel disini...</p>',
  );

  return (
    <>
      <AppCard
        title={
          <Box fontSize={16} fontWeight={Fonts.BOLD}>
            Konten Artikel
          </Box>
        }>
        <FormikTextField
          margin='normal'
          label={'Judul Artikel'}
          name={artikelFormFormikFieldNameEnum.title}
          type='text'
          variant='outlined'
          className={classes.myTextFieldRoot}
        />
        <Box mt={3}>
          <Box mb={2}>
            <h4 style={{fontWeight: 'normal'}}>Isi Artikel</h4>
          </Box>
          <Editor
            key={editorKey}
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            initialValue={initEditorValue}
            init={{
              height: 500,
              automatic_uploads: true,
              images_upload_handler: async (blobInfo, success, failure) => {
                const uploaded = await ArtikelService.create.handleTinyUploadImage(
                  artikelId!,
                  blobInfo,
                );
                if (uploaded.status === 'success') {
                  await queryClient.invalidateQueries(
                    `imagesUploadedArtikel-${artikelId}`,
                  );
                  success(uploaded.location);
                } else {
                  console.error(
                    '🚀 ~ file: index.tsx ~ line 76 ~ images_upload_handler: ~ uploaded.message',
                    uploaded.message,
                  );
                  failure(
                    `HTTP ArtikelCreateService.handleTinyImage error: ${JSON.stringify(
                      uploaded.message,
                    )}`,
                  );
                }
              },
              plugins:
                'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
              imagetools_cors_hosts: ['picsum.photos'],
              menubar: 'file edit view insert format tools table help',
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: '30s',
              autosave_prefix: '{path}{query}-{id}-',
              autosave_restore_when_empty: true,
              autosave_retention: '2m',
              image_advtab: true,
              importcss_append: true,
              template_cdate_format:
                '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format:
                '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
              image_caption: true,
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_noneditable_class: 'mceNonEditable',
              toolbar_mode: 'sliding',
              contextmenu: 'link image imagetools table',
              skin: themeMode === ThemeMode.DARK ? 'oxide-dark' : 'oxide',
              content_css: themeMode === ThemeMode.DARK ? 'dark' : 'default',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={(content, editor) => {
              setFieldValue('body', editor.getContent());
            }}
          />
        </Box>
      </AppCard>
    </>
  );
};

export default ArtikelContentEditor;
