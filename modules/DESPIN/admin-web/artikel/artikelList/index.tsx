import React, {useEffect, useState} from 'react';
import ArtikelListing from './ArtikelListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../../../@crema/core/AppsContainer';
import ArtikelSidebar from './ArtikelSidebar';
import {IArtikelCategories} from '../../../../../pages/admin-web/artikel';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import ArtikelService from '../../../../../@crema/services/despin-api/artikel/artikel.service';

export interface IArtikelListProps {
  categories: IArtikelCategories;
  activeArtikelType: string;
  activeCategory: string;
}

export interface IArtikelListParentState {
  expanded: string[];
  setExpanded: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ArtikelList = ({
  categories,
  activeArtikelType = 'dinamis',
  activeCategory = 'berita-desa',
}: IArtikelListProps) => {
  const {messages} = useIntl();

  const [expanded, setExpanded] = useState([
    activeArtikelType !== null ? activeArtikelType : 'dinamis',
  ]);
  const [selected, setSelected] = useState(
    activeCategory !== null ? activeCategory : 'berita-desa',
  );

  const listArtikel = useQuery([`artikel-list-${selected}`, selected], () =>
    ArtikelService.getArtikelListByKategori(selected),
  );

  return (
    <AppsContainer
      title={messages['sidebar.ecommerce.products'] as string}
      sidebarContent={
        <ArtikelSidebar
          categories={categories}
          parentState={{expanded, setExpanded, selected, setSelected}}
        />
      }>
      <ArtikelListing listArtikel={listArtikel.data} />
    </AppsContainer>
  );
};

export default ArtikelList;
