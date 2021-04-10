import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import {Box, makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';

const Application = () => {
  const useStyles = makeStyles(() => ({
    textBase: {
      fontSize: 14,
    },
  }));

  const classes = useStyles();

  const {messages} = useIntl();
  return (
    <AppCard title={messages['eCommerce.application']} height={1}>
      <Box display='flex' flexDirection='column' justifyContent='center'>
        <Box mb={9}>
          <AppCircularProgress
            activeColor='#49BD65'
            hidePercentage
            value={70}
            centerNode={
              <img
                alt='icon'
                style={{
                  borderRadius: '50%',
                  boxShadow: '0px 10px 20px rgba(160, 165, 185, 0.2)',
                }}
                src={
                  '${process.env.NEXT_PUBLIC_BASE_PATH}/images/dashboard/application_icon.png'
                }
              />
            }
            thickness={2}
          />
        </Box>
        <Box display='flex' justifyContent='center'>
          <Box mr={6} display='flex' alignItems='center'>
            <Box
              bgcolor='#49BD65'
              height={10}
              width={10}
              mr={2}
              borderRadius='50%'
            />
            <Typography className={classes.textBase}>Android</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box
              bgcolor='#d6d6d6'
              height={10}
              width={10}
              mr={2}
              borderRadius='50%'
            />
            <Typography className={classes.textBase}>IOS</Typography>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Application;
