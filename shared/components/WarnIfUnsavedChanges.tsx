import Router from 'next/router';
import {useEffect} from 'react';

interface IUseWarnIfUnsavedChangesProps {
  unsavedChanges: boolean;
}

const WarnIfUnsavedChanges = ({
  unsavedChanges,
}: IUseWarnIfUnsavedChangesProps) => {
  useEffect(() => {
    const confirmationMessage = 'Changes you made may not be saved.';
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };
    const beforeRouteHandler = (url: string) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        // to inform NProgress or something ...
        Router.events.emit('routeChangeError');
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };
    if (unsavedChanges) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      Router.events.on('routeChangeStart', beforeRouteHandler);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [unsavedChanges]);

  return null;
};

export default WarnIfUnsavedChanges;
