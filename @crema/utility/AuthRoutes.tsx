import React, {ReactNode, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import AppContext from './AppContext';
import {useAuthToken} from './AppHooks';
import PropTypes from 'prop-types';
import AppContextPropsType from '../../types/AppContextPropsType';
import {NavStyle, ThemeMode, ThemeStyle} from '../../shared/constants/AppEnums';


interface AuthRoutesProps {
  children: ReactNode | any;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({children}) => {
  const router = useRouter();
  const {query} = router;

  const {changeNavStyle, updateThemeMode, setRTL, updateThemeStyle} = useContext<AppContextPropsType>(
    AppContext,
  );
  useAuthToken();


  useEffect(() => {
    function handleQueryParams() {
      if (query.layout) {
        changeNavStyle(query.layout as NavStyle);
      }
      if (query.mode) {
        updateThemeMode(query.mode as ThemeMode);
      }
      if (query.rtl) {
        setRTL(true);
      }
      if (query.style) {
        updateThemeStyle!(query.style as ThemeStyle);
      }
    }

    if (query) {
      handleQueryParams();
    }
  }, [changeNavStyle, updateThemeMode, setRTL, updateThemeStyle, query]);
  return <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
