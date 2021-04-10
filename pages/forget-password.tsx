import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword'));
export default AppPage(() => <ForgetPassword/>);
