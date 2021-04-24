import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from '@material-ui/core';
import {nanoid} from 'nanoid';
import React, {useContext} from 'react';
import {useAlert} from 'react-alert';
import {useQueryClient} from 'react-query';
import {CremaTheme} from '../../../../../../../../types/AppContextPropsType';
import ArtikelFormContext, {
  ArtikelFormModeEnum,
} from '../../../../contexts/artikel-form.context';
import clipboardCopy from 'clipboard-copy';
import {useFormikContext} from 'formik';
import {artikelFormFormikFieldNameEnum} from '../../../../dto/artikel-form-formik-field-name.enum';
import {IArtikelFormFormikValues} from '../../../../dto/artikel-form-formik-value.dto';
import ArtikelService from '../../../../../../../../@crema/services/despin-api/artikel/artikel.service';
import AppsDeleteIcon from '../../../../../../../../@crema/core/AppsDeleteIcon';

const useStyles = makeStyles((theme: CremaTheme) => ({
  imageItemContainer: {
    width: '60px',
    height: '60px',
    display: 'block',
  },
  imageItem: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  btnSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
}));

const RowsArtikelImages = () => {
  const classes = useStyles();
  const rAlert = useAlert();
  const queryClient = useQueryClient();

  const {imagesUploaded, artikelId, mode, handleDeleteImage} = useContext(
    ArtikelFormContext,
  );
  const {
    setFieldValue,
    values: formikValues,
  } = useFormikContext<IArtikelFormFormikValues>();

  const showError = (message: string) => (
    <TableRow>
      <TableCell valign='middle' align='center' colSpan={3}>
        {message}
      </TableCell>
    </TableRow>
  );

  if (imagesUploaded!.isLoading) {
    return showError('Mengambil data...');
  }

  if (imagesUploaded!.isError) {
    console.error(
      '🚀 ~ file: index.tsx ~ line 118 ~ RowsArtikelImages ~ imagesUploaded.error',
      imagesUploaded!.error,
    );
    return showError('Error mengambil data.');
  }

  if (imagesUploaded!.data.length < 1) {
    return showError('Belum ada gambar.');
  }

  return (
    <>
      {imagesUploaded!.data.map((img: any, index: number) => (
        <TableRow key={`tr-${nanoid()}`}>
          <TableCell valign='middle'>
            <Box className={classes.imageItemContainer}>
              <img
                className={classes.imageItem}
                src={img.url}
                alt={img.displayName}
              />
            </Box>
          </TableCell>
          <TableCell valign='middle'>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
              spacing={3}>
              <Grid item>
                <Box>{img.displayName}</Box>
              </Grid>
              <Grid item>
                <Button
                  size='small'
                  className={classes.btnSuccess}
                  onClick={async () => {
                    try {
                      await clipboardCopy(img.url);

                      rAlert.success(
                        `URL gambar ${img.displayName} berhasil di copy!`,
                      );
                    } catch (error) {
                      console.error(
                        '🚀 ~ file: index.tsx ~ line 159 ~ onClick={ ~ error',
                        error,
                      );
                      rAlert.error(
                        `URL gambar ${img.displayName} gagal di copy!`,
                      );
                    }
                  }}>
                  Copy URL
                </Button>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell valign='middle'>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='checkedB'
                      color='primary'
                      onChange={() => {
                        setFieldValue(
                          artikelFormFormikFieldNameEnum.mainImageId,
                          img.id,
                        );
                      }}
                      checked={formikValues.mainImageId === img.id}
                    />
                  }
                  label='Utama'
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={async () => {
                    const doDelete = handleDeleteImage!;
                    await doDelete(img.id);
                    if (formikValues.mainImageId === img.id) {
                      setFieldValue(
                        artikelFormFormikFieldNameEnum.mainImageId,
                        '',
                      );
                    }
                  }}
                  color='secondary'
                  aria-label='delete'>
                  <Icon>delete</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default RowsArtikelImages;
