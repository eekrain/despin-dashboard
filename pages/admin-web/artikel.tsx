import {useRouter} from 'next/router';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import ArtikelService from '../../@crema/services/despin-api/artikel/artikel.service';
import asyncComponent from '../../@crema/utility/asyncComponent';
// import ArtikelList from '../../modules/DESPIN/admin-web/artikel/artikelList';

export interface IArtikelCategory {
  id: number;
  name: string;
  slug: string;
}

export interface IArtikelCategories {
  dinamis: IArtikelCategory[];
  statis: IArtikelCategory[];
}

export interface IArtikelListByCategory {
  id: string;
  title: string;
  slug: string;
  isDisplayedRevision: boolean;
  createdAt: string;
}

export async function getServerSideProps() {
  const categories: IArtikelCategories = await ArtikelService.getArtikelCategories();

  return {
    props: {
      categories,
    },
  };
}

const ArtikelList: any = asyncComponent(
  () => import('../../modules/DESPIN/admin-web/artikel/artikelList'),
);

interface IArtikelIndexProps {
  categories: IArtikelCategories;
}

export default AppPage(({categories}: IArtikelIndexProps) => {
  const {query} = useRouter();
  return (
    <ArtikelList
      categories={categories}
      activeArtikelType={query.activeArtikelType}
      activeCategory={query.activeCategory}
    />
  );
});
