import axios, { AxiosRequestConfig } from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchApi = (url: string, options?: AxiosRequestConfig) => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}${url}`,
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
