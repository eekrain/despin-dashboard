import React, {useContext} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppContext from '../../../@crema/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import AppContextPropsType from '../../../types/AppContextPropsType';

const AppLogo = () => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
    },
    logo: {
      height: 36,
      marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.logoRoot}>
      <Hidden smUp>
        <img
          className={classes.logo}
          src={
            themeMode === ThemeMode.DARK
              ? '/images/logo-pageraji.png'
              : '/images/logo-pageraji.png'
          }
          alt='crema-logo'
        />
      </Hidden>
      <Hidden xsDown>
        <Box display='flex'>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? '/images/logo-pageraji.png'
                : '/images/logo-pageraji.png'
            }
            alt='crema-logo'
          />
          <Box
            display='flex'
            flexDirection='column'
            style={{fontFamily: 'Noto Sans JP'}}>
            <span style={{fontWeight: 500, fontSize: '1.1rem'}}>
              Desa Pageraji
            </span>
            <span style={{fontWeight: 400, fontSize: '0.8rem'}}>
              By Desa Pintar
            </span>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default AppLogo;
