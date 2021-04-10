import React from 'react';
import AuthLayout from './AuthLayout';

const withLayout = (ComposedComponent: any) => (props: any) => {
  return (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
};
export default withLayout;
