import {Box} from '@material-ui/core';
import React from 'react';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import ImportTabs from './ImportTabs';

function Database() {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <ImportTabs />
    </AppAnimate>
  );
}

export default Database;
