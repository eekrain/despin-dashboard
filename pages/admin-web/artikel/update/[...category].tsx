import {GetServerSideProps} from 'next';
import React from 'react';
import {IArtikelCategories} from '..';
import AppPage from '../../../../@crema/hoc/AppPage';
import ArtikelService from '../../../../@crema/services/despin-api/artikel/artikel.service';
import IApiStatus from '../../../../@crema/services/dto/api-status.dto';
import asyncComponent from '../../../../@crema/utility/asyncComponent';

const UpdateArtikel: any = asyncComponent(
  () =>
    import('../../../../modules/DESPIN/admin-web/artikel/artikelForm/update'),
);

export interface IUpdateArtikelProps {
  categoryType: string;
  categorySlug: string;
  artikelData: IApiStatus;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const catParams = context?.params?.category;
  const categoryType = catParams ? catParams[0] : 'dinamis';
  const categorySlug = catParams ? catParams[1] : 'berita-desa';
  const artikelId = catParams ? catParams[2] : null;
  let artikelData: IApiStatus;
  if (artikelId) {
    artikelData = await ArtikelService.update.getArtikelDataById(artikelId);
    const mainImageId = await ArtikelService.update.getArtikelMainImageId(
      artikelId,
    );
    artikelData.data.mainImageId = mainImageId?.data ? mainImageId.data : '';
  } else {
    artikelData = {isSuccess: false, message: 'No Artikel ID Provided'};
  }

  return {
    props: {categoryType, categorySlug, artikelData},
  };
};

export default AppPage(
  ({categoryType, categorySlug, artikelData}: IUpdateArtikelProps) => {
    return (
      <UpdateArtikel
        categoryType={categoryType}
        categorySlug={categorySlug}
        artikelData={artikelData}
      />
    );
  },
);
