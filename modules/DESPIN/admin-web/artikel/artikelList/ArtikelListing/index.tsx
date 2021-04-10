import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {nanoid} from 'nanoid';
import React from 'react';
import {IArtikelListByCategory} from '../../../../../../pages/admin-web/artikel';
import DateTime from '../../../../../../shared/components/DateTime';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IArtikelListingProps {
  listArtikel: IArtikelListByCategory[];
}

const ArtikelListing = ({listArtikel}: IArtikelListingProps) => {
  const classes = useStyles();

  return (
    <Table className={classes.table} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Judul</TableCell>
          <TableCell>Tgl Posting</TableCell>
          <TableCell align='right'>Aksi</TableCell>
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  );
};

const ArtikelRows = (listArtikel: IArtikelListByCategory[]) => {
  if (listArtikel.length < 1) {
    return (
      <TableRow key={nanoid()}>
        <TableCell colSpan={4}>Tidak ada artikel pada kategori ini.</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {listArtikel.map((artikel, i) => (
        <TableRow key={nanoid()}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{artikel.title}</TableCell>
          <TableCell>
            <DateTime time={artikel.createdAt} />
          </TableCell>
          <TableCell>1 2 3 4</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default ArtikelListing;
