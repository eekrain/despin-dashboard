import React, {useContext} from 'react';
import Layouts from '../../core/AppLayout/Layouts';
import AppContext from '../../utility/AppContext';
import useStyles from '../../../shared/jss/common/common.style';
import AppContextPropsType from '../../../types/AppContextPropsType';

const withLayout = (ComposedComponent: any) => (props: any) => {
  useStyles();
  const {navStyle} = useContext<AppContextPropsType>(AppContext);
  const AppLayout = Layouts[navStyle];
  return (
    <AppLayout>
      <ComposedComponent {...props} />
    </AppLayout>
  );
};

export default withLayout;
