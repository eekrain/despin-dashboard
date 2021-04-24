import React from 'react';
import {useField} from 'formik';
import {TextField} from '@material-ui/core';

const FormikTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default FormikTextField;
