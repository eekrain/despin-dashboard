import React, {ReactNode, useContext} from 'react';
import {IntlProvider} from 'react-intl';

import AppLocale from '../../shared/localization';
import AppContext from './AppContext';
import AppContextPropsType from '../../types/AppContextPropsType';
import {IntlGlobalProvider} from './Utils';


interface LocaleProviderProps {
  children: ReactNode | any

  [x: string]: any
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({children}) => {
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      defaultLocale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <IntlGlobalProvider>{children}</IntlGlobalProvider>
    </IntlProvider>
  );
};

export default LocaleProvider;
