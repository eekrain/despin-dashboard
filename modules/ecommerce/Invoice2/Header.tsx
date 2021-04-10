import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import invoiceData from '../../../@crema/services/db/extraPages/invoice/invoiceData';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  logoRoot: {
    display: 'inline-block',
    width: 100,
    [theme.breakpoints.down('xs')]: {
      width: 60,
    },
  },
  textRes: {
    fontSize: 16,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Box py={{xs: 6, sm: 8, xl: 10}} px={{xs: 6, xl: 8}} mb={{xl: 8}}>
      <Box mb={8} textAlign='center'>
        <img
          className={classes.logoRoot}
          alt='logo'
          src={
            '${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-icon-large.png'
          }
        />
      </Box>

      <Box
        mx={-3}
        color='text.secondary'
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        justifyContent={{sm: 'space-between'}}
        flex={1}>
        <Box px={3} mb={3} textAlign={{xs: 'center', sm: 'left'}}>
          <Box
            component='h3'
            color='grey.700'
            mb={1}
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            {invoiceData.company.name}
          </Box>
          <Box component='p' mb={1}>
            {invoiceData.company.address1}
          </Box>
          <Box component='p' mb={1}>
            {invoiceData.company.address2}
          </Box>
          <Box component='p' mb={1}>
            Phone: {invoiceData.company.phone}
          </Box>
        </Box>

        <Box px={3} mb={3} textAlign='center'>
          <Box
            component='h3'
            color='grey.700'
            mb={1}
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            <IntlMessages id='invoice.client' />
          </Box>
          <Box component='p' mb={1}>
            {invoiceData.client.name}
          </Box>
          <Box component='p' mb={1}>
            {invoiceData.client.phone}
          </Box>
          <Box component='p' mb={1}>
            {invoiceData.client.email}
          </Box>
        </Box>

        <Box px={3} mb={3} textAlign={{xs: 'center', sm: 'right'}}>
          <Box
            component='h3'
            mb={1}
            color='grey.700'
            fontWeight={Fonts.BOLD}
            className={classes.textRes}>
            <IntlMessages id='invoice.invoice' />
          </Box>
          <Box component='p' mb={1} fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='invoice.id' />: {invoiceData.invoice.id}
          </Box>
          <Box component='p' mb={1}>
            <IntlMessages id='invoice.issued' />: {invoiceData.invoice.date}
          </Box>
          <Box component='p' mb={1} fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='invoice.dueOn' />: {invoiceData.invoice.dueDate}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
