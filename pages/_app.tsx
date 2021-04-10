import React from 'react';
import {NextComponentType} from 'next';
import {AppContext, AppInitialProps, AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@crema/utility/ContextProvider';
import CremaThemeProvider from '../@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '../@crema/utility/CremaStyleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import PageMeta from '../@crema/core/PageMeta';
import {LocaleProvider} from '../@crema';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const CremaApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <PageMeta />
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Provider store={store}>
            <CremaThemeProvider>
              <CremaStyleProvider>
                <LocaleProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </AuthRoutes>
                </LocaleProvider>
              </CremaStyleProvider>
            </CremaThemeProvider>
          </Provider>
        </ContextProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
};
export default CremaApp;
