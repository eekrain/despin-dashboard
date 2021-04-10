import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default AppPage(() => <SignIn/>);
