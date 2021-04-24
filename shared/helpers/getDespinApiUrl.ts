const getDespinApiUrl = () => {
  if (process.browser) return process.env.NEXT_PUBLIC_API_URL_CLIENT;
  return process.env.NEXT_PUBLIC_API_URL_SERVER;
};

export default getDespinApiUrl;
