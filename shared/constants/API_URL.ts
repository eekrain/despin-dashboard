import {isNode} from 'browser-or-node';

const getDespinApiUrl = () => {
  let dev;
  if (isNode) dev = process.env.NEXT_PUBLIC_DESPIN_API_URL_DEV_SERVER;
  else dev = process.env.NEXT_PUBLIC_DESPIN_API_URL_DEV_CLIENT;
  return process.env.NODE_ENV === 'development'
    ? dev
    : process.env.VERCEL_GIT_COMMIT_REF === 'production'
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
    : process.env.VERCEL_GIT_COMMIT_REF === 'staging' ||
      process.env.VERCEL_GIT_COMMIT_REF === 'master'
    ? process.env.NEXT_PUBLIC_API_URL_STAGING
    : `http://localhost:3000/api`;
};

const API_URL = {getDespinApiUrl};

export default API_URL;