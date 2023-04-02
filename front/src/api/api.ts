import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';

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
  logout: () => api.delete(`/member`),
};

export const detailAPI = {
  getBean: (id: number) => api.get(`/item/bean/${id}`),
};

//가변인자 보내기
const getData = (...params: any) => {
  const url = `/item/bean?${params.join('&')}`;
  return api.get(url);
};
export const listAPI = {
  getBeans: (...params: any) => getData(...params),
};

// 설문조사 페이지 /api/v1/survey
export const surveyAPI = {
  postSurvey: (surveyli: number[]) =>
    api.post(`/api/v1/survey`, { surveyli: surveyli }),
};
