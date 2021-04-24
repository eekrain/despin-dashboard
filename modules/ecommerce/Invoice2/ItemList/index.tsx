import React from 'react';
import clsx from 'clsx';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import TableBody from '@material-ui/core/TableBody';
import invoiceData from '../../../../@crema/services/db/extraPages/invoice/invoiceData';
import {Box, makeStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  invoiceTable: {
    '@media (min-width: 768px)': {
      tableLayout: 'fixed',

      '& thead th': {
        whiteSpace: 'nowrap',
      },
    },
  },
  [theme.breakpoints.up('lg')]: {
    invoiceTable: {
      '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td': {
        padding: 24,
      },
    },
  },
  [theme.breakpoints.up('xl')]: {
    invoiceTable: {
      '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td': {
        padding: 32,
      },
    },
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textBase: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 13,
  },
  alignTop: {
    verticalAlign: 'top',
  },
}));
const ItemList = () => {
  const classes = useStyles();
  return (
    <Table className={classes.invoiceTable}>
      <TableHead>
        <TableHeading />
      </TableHead>

      <TableBody>
        {invoiceData.products.map(product => {
          return <TableItem key={product.id} product={product} />;
        })}

        <TableRow>
          <TableCell component='th' scope='row'>
            <Box
              color='grey.700'
              fontWeight={Fonts.MEDIUM}
              className={clsx(classes.textUppercase, classes.textBase)}>
              <IntlMessages id='invoice.subTotal' />
            </Box>
          </TableCell>
          <TableCell>
            <Box
              color='grey.700'
              className={clsx(classes.textUppercase, classes.textBase)}
              textAlign='right'
              fontWeight={Fonts.MEDIUM}>
              ${invoiceData.subTotal}
            </Box>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell component='th' scope='row'>
            <Box
              color='grey.700'
              fontWeight={Fonts.MEDIUM}
              className={clsx(classes.textUppercase, classes.textBase)}>
              <IntlMessages id='invoice.rebate' />
            </Box>
          </TableCell>
          <TableCell>
            <Box
              color='grey.700'
              className={clsx(classes.textUppercase, classes.textBase)}
              textAlign='right'
              fontWeight={Fonts.MEDIUM}>
              ${invoiceData.rebate}
            </Box>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell component='th' scope='row'>
            <Box
              color='grey.700'
              className={clsx(classes.textUppercase, classes.textLg)}
              fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='invoice.grandTotal' />
            </Box>
          </TableCell>
          <TableCell>
            <Box
              color='grey.700'
              className={clsx(
                classes.textUppercase,
                classes.textLg,
                classes.alignTop,
              )}
              textAlign='right'
              fontWeight={Fonts.MEDIUM}>
              ${invoiceData.total}
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ItemList;
