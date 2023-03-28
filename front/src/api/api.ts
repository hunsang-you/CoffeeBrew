import axios from 'axios';

const BASE_URL = 'https://j8b305.p.ssafy.io/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token;

  return config;
});

export default api;

export const loginAPI = {
  login: () => api.post(`/login`),
};
