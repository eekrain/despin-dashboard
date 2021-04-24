import {Box} from '@material-ui/core';
import {useFormikContext} from 'formik';
import React, {useContext} from 'react';
import {QueryClient, UseMutationResult, UseQueryResult} from 'react-query';
import AppCard from '../../../../../../../@crema/core/AppCard';
import {IHandleUpload} from '../../../../../../../@crema/services/despin-api/artikel/artikel-create.service';
import {Fonts} from '../../../../../../../shared/constants/AppEnums';
import ArtikelFormContext from '../../../contexts/artikel-form.context';
import {IArtikelFormFormikValues} from '../../../dto/artikel-form-formik-value.dto';
import DropzoneArtikel from './DropzoneArtikel';
import ListArtikelImages from './ListArtikelImages';

const ArtikelImagesUpload = () => {
  return (
    <>
      <AppCard
        title={
          <Box fontSize={16} fontWeight={Fonts.BOLD}>
            Gambar
          </Box>
        }>
        <Box mb={4}>
          <ListArtikelImages />
        </Box>
        <DropzoneArtikel />
      </AppCard>
    </>
  );
};

export default ArtikelImagesUpload;
