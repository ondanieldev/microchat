import axios from 'axios';

import getAuthToken from 'Helpers/getAuthToken';

const isDevelopment =
  process.env.REACT_APP_IS_DEV || process.env.NODE_ENV === 'development';
export const backendURL = !isDevelopment
  ? 'https://microchat-api.ondaniel.com.br/'
  : 'http://localhost:3333/';

const api = axios.create({
  baseURL: backendURL,
});

api.interceptors.request.use(config => {
  try {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default api;
