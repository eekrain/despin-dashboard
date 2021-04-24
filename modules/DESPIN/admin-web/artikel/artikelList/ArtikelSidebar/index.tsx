import {Box} from '@material-ui/core';
import React from 'react';
import {IArtikelListParentState} from '..';
import {Scrollbar} from '../../../../../../@crema';
import {IArtikelCategories} from '../../../../../../pages/admin-web/artikel';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import ArtikelCategory from './ArtikelCategory';

interface IArtikelSidebarProps {
  categories: IArtikelCategories;
  parentState: IArtikelListParentState;
  redirectCategories: () => void;
}

const ArtikelSidebar = ({
  categories,
  parentState,
  redirectCategories,
}: IArtikelSidebarProps) => {
  return (
    <Scrollbar className='scroll-app-sidebar'>
      <Box p={6}>
        <Box component='h5' mb={4} fontWeight={Fonts.MEDIUM}>
          Tipe Kategori
        </Box>
        <ArtikelCategory
          data={categories}
          parentState={parentState}
          redirectCategories={redirectCategories}
        />
      </Box>
    </Scrollbar>
  );
};

export default ArtikelSidebar;
