import axios, { InternalAxiosRequestConfig } from 'axios';

const APIKEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const APIURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: APIURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.params = {
    ...config.params,
    key: APIKEY,
  };

  return { ...config };
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log('error response', err);

    return Promise.reject(err);
  }
);

export { api };
