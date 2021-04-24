import {Icon, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

interface IAlertTemplateProps {
  style?: any;
  options?: any;
  message?: any;
  close?: () => void;
}

const AlertTemplate = ({
  style,
  options,
  message,
  close,
}: IAlertTemplateProps) => {
  return (
    <Alert
      severity={options.type}
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={close}>
          <Icon fontSize='inherit'>close</Icon>
        </IconButton>
      }>
      {message}
    </Alert>
  );
};

export default AlertTemplate;
