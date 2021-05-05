import React, {useEffect, useState} from 'react';
import ArtikelListing from './ArtikelListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../../../@crema/core/AppsContainer';
import ArtikelSidebar from './ArtikelSidebar';
import {IArtikelCategories} from '../../../../../pages/admin-web/artikel';
import {useRouter} from 'next/router';
import {useQuery, useQueryClient} from 'react-query';
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
  activeCategory = 'berita',
}: IArtikelListProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState([activeArtikelType]);
  const [selected, setSelected] = useState(activeCategory);

  const listArtikel = useQuery([`artikel-list-${selected}`, selected], () =>
    ArtikelService.getArtikelListByKategori(selected),
  );

  const refetchListArtikel = async () => {
    await queryClient.invalidateQueries(`artikel-list-${selected}`);
  };

  const redirectCategories = () => {
    router.push(
      `/admin-web/artikel?activeArtikelType=${expanded}&activeCategory=${selected}`,
      '/admin-web/artikel',
      {
        shallow: true,
      },
    );
  };

  return (
    <AppsContainer
      title={`Artikel`}
      sidebarContent={
        <ArtikelSidebar
          categories={categories}
          parentState={{expanded, setExpanded, selected, setSelected}}
          redirectCategories={redirectCategories}
        />
      }>
      <ArtikelListing
        listArtikel={listArtikel.data}
        refetchListArtikel={refetchListArtikel}
        parentState={{expanded, setExpanded, selected, setSelected}}
      />
    </AppsContainer>
  );
};

export default ArtikelList;
