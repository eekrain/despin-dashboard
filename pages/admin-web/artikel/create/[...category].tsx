import {GetServerSideProps} from 'next';
import React from 'react';
import {IArtikelCategories} from '..';
import AppPage from '../../../../@crema/hoc/AppPage';
import ArtikelService from '../../../../@crema/services/despin-api/artikel/artikel.service';
import asyncComponent from '../../../../@crema/utility/asyncComponent';

const CreateArtikel: any = asyncComponent(
  () =>
    import('../../../../modules/DESPIN/admin-web/artikel/artikelForm/create'),
);

interface ICreateArtikelProps {
  categoryType: string;
  categorySlug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const catParams = context?.params?.category;
  const categoryType = catParams ? catParams[0] : 'dinamis';
  const categorySlug = catParams ? catParams[1] : 'berita-desa';
  return {
    props: {categoryType, categorySlug},
  };
};

export default AppPage(({categoryType, categorySlug}: ICreateArtikelProps) => {
  return (
    <CreateArtikel categoryType={categoryType} categorySlug={categorySlug} />
  );
});
