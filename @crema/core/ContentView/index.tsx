import React, {ReactNode, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';import {useRouter} from 'next/router';

import {AppSuspense} from '../../index';
import Scrollbar from '../Scrollbar';
import AppContext from '../../utility/AppContext';
import AppFooter from '../AppLayout/AppFooter';
import Box from '@material-ui/core/Box';
import {RouteTransition} from '../../../shared/constants/AppEnums';
import AppErrorBoundary from '../AppErrorBoundary';
import AppContextPropsType from '../../../types/AppContextPropsType';

interface TransitionWrapperProps {
  children: any;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({children}) => {
  const {rtAnim} = useContext<AppContextPropsType>(AppContext);
  const {pathname} = useRouter();
  if (rtAnim === RouteTransition.NONE) {
    return <>{children}</>;
  }
  return (
    <TransitionGroup appear enter exit>
      <CSSTransition
        key={pathname}
        timeout={{enter: 300, exit: 300}}
        classNames={rtAnim}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

TransitionWrapper.propTypes = {};

interface ContentViewProps {
  children?: ReactNode;
}

const ContentView: React.FC<ContentViewProps> = (props) => {
  return (
    <Scrollbar>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        className='main-content-view'>
        <AppSuspense>
          <AppErrorBoundary>
            <TransitionWrapper>{props.children}</TransitionWrapper>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </Scrollbar>
  );
};

export default ContentView;
