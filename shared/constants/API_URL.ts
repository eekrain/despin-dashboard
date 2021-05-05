import {isNode} from 'browser-or-node';

const getDespinApiUrl = () => {
  let dev;
  if (isNode) dev = process.env.NEXT_PUBLIC_DESPIN_API_URL_DEV_SERVER;
  else dev = process.env.NEXT_PUBLIC_DESPIN_API_URL_DEV_CLIENT;
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? dev
    : process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
    : process.env.NEXT_PUBLIC_API_URL_STAGING;
};

const API_URL = {getDespinApiUrl};

export default API_URL;
