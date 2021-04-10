const get_NEXT_PUBLIC_SITE_URL = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.DESPIN_SITE_URL_PROD
    : process.env.NODE_ENV === 'staging'
    ? process.env.DESPIN_SITE_URL_STAGING
    : process.env.DESPIN_SITE_URL_DEV;
};

const get_NEXT_PUBLIC_API_URL = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.DESPIN_API_URL_PROD
    : process.env.NODE_ENV === 'staging'
    ? process.env.DESPIN_API_URL_STAGING
    : process.env.DESPIN_API_URL_DEV;
};

module.exports = {
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  env: {
    NEXT_PUBLIC_SITE_URL: get_NEXT_PUBLIC_SITE_URL(),
    NEXT_PUBLIC_API_URL: get_NEXT_PUBLIC_API_URL(),
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${get_NEXT_PUBLIC_API_URL()}/api/:path*`,
      },
    ];
  },
};
