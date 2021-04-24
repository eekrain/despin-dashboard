import {Box, Icon, makeStyles} from '@material-ui/core';
import React from 'react';
import {useDropzone} from 'react-dropzone';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  dropzoneRoot: {
    height: '200px',
    width: '100%',
    backgroundColor: 'white',
    outline: `2px dashed ${theme.palette.gray[600]}`,
    color: theme.palette.gray[600],
    outlineOffset: '-10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    textAlign: 'center',
    cursor: 'crosshair',
    '&:hover, &:focus': {
      outline: `2px dashed ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
  },
  uploadIcon: {
    fontSize: '5rem',
  },
}));

interface IMyDropzoneProps {
  acceptedFilesExt: any;
  maxFiles: any;
  handleOnDrop: (acceptedFiles: any[]) => Promise<void>;
}

const MyDropzone = ({
  acceptedFilesExt,
  maxFiles,
  handleOnDrop,
}: IMyDropzoneProps) => {
  const classes = useStyles();
  const {getRootProps, getInputProps} = useDropzone({
    accept: acceptedFilesExt,
    maxFiles: maxFiles,
    onDrop: (acceptedFiles) => {
      handleOnDrop(acceptedFiles);
    },
  });

  return (
    <Box
      {...getRootProps({
        className: `dropzone ${classes.dropzoneRoot}`,
      })}>
      <input {...getInputProps()} />
      <Icon className={classes.uploadIcon}>cloud_upload</Icon>
      <p>
        Tarik dan masukkan file kedalam box / klik untuk meng-unggah gambar.
      </p>
    </Box>
  );
};

export default MyDropzone;
