import {Box, Button, Grid, makeStyles} from '@material-ui/core';
import React, {useContext} from 'react';
import {CremaTheme} from '../../../../../../types/AppContextPropsType';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import {GridContainer} from '../../../../../../@crema';
import ArtikelContentEditor from './ArtikelContentEditor';
import ArtikelImagesUpload from './ArtikelImagesUpload';
import ArtikelFormContext from '../../contexts/artikel-form.context';

const useStyles = makeStyles((theme: CremaTheme) => ({
  myTextFieldRoot: {
    width: '100%',
  },
  buttonWarning: {
    backgroundColor: theme.palette.warning.light,
    color: 'white',
  },
}));

const ArtikelForm = () => {
  const classes = useStyles();
  const {appTitle, redirectToArtikelList} = useContext(ArtikelFormContext);
  return (
    <Box>
      {/* Header */}
      <Box
        component='h2'
        color='text.primary'
        fontWeight={Fonts.BOLD}
        mb={6}
        fontSize={16}>
        {appTitle}
      </Box>

      <Box display='flex' flexDirection='row-reverse' mb={4}>
        <Box ml={3}>
          <Button
            variant='contained'
            onClick={redirectToArtikelList}
            className={classes.buttonWarning}>
            Cancel
          </Button>
        </Box>
        <Box ml={3}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='mr-3'>
            Save
          </Button>
        </Box>
      </Box>

      <GridContainer>
        <Grid item xs={12} md={8}>
          <ArtikelContentEditor />
        </Grid>

        <Grid item xs={12} md={4}>
          <ArtikelImagesUpload />
        </Grid>
      </GridContainer>
    </Box>
  );
};

export default ArtikelForm;
