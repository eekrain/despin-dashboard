import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {CremaTheme} from '../../../../../../../../types/AppContextPropsType';
import RowsArtikelImages from './RowsArtikelImages';
const useStyles = makeStyles((theme: CremaTheme) => ({
  table: {
    width: '100%',
  },
}));

const ListArtikelImages = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Gambar</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RowsArtikelImages />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListArtikelImages;
