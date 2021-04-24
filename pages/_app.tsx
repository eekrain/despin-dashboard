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
import {transitions, positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from '../shared/components/AlertTemplate';

const queryClient = new QueryClient();
const reactAlertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

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
            <AlertProvider template={AlertTemplate} {...reactAlertOptions}>
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
            </AlertProvider>
          </Provider>
        </ContextProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
};
export default CremaApp;
