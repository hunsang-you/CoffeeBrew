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
  /**카카오 로그인 */
  login: () => api.post(`/login`),
  /**로그아웃 */
  logout: () => api.get(`/logout`),
  /**회원탈퇴 */
  withdraw: () => api.delete(`/member`),
};

export const detailAPI = {
  /**원두 상세 조회 */
  getBean: (id: number) => api.get(`/item/bean/${id}`),
  /**원두 좋아요 조회 */
  beanLike: (id: number) => api.get(`member/like/toggle/bean/${id}`),
  recommendBean: (id: number) => api.get(`recom/bean/${id}`),
};

/**원두 리스트,검새,필터 가변인자 보내기 */
const getData = (...params: any) => {
  const url = `/item/bean?${params.join('&')}`;
  console.log(`test2: ${url}`);
  return api.get(url);
};
/**캡슐 리스트, 검색, 필터 가변인자 보내기 */
const getDataCapsule = (...params: any) => {
  const url = `/item/capsule?${params.join('&')}`;
  console.log(`testcap: ${url}`);
  return api.get(url);
};

export const listAPI = {
  /**원두 리스트 조회 */
  getBeans: (...params: any) => getData(...params),
  /**캡슐 리스트 조회 */
  getCapsules: (...params: any) => getDataCapsule(...params),
};

export const reviewAPI = {
  /**원두에 대한 리뷰 불러오기 */
  getBeanReview: (id: number) => api.get(`review/bean/${id}`),
  /**리뷰작성 */
  createBeanReview: (
    id: number,
    content: string,
    overall: number,
    flavor: number,
    acidity: number,
    sweetness: number,
    bitterness: number,
    body: number,
  ) =>
    api.post(`member/review`, {
      itemType: 'bean',
      itemIdx: id,
      content: content,
      overall: overall,
      flavor: flavor,
      acidity: acidity,
      sweetness: sweetness,
      bitterness: bitterness,
      body: body,
      coffeeing_note: 'none',
      expired: true,
    }),
  /**리뷰 삭제 */
  deleteReview: (id: number) => api.delete(`member/review/${id}`),
};

// 메인페이지
export const mainAPI = {
  /**추천 원두 조회 */
  getBeanRecom: (beanId: number) => api.get(`recom/bean/${beanId}`),
  /**추천 캡슐 조회 */
  getcapcullRecom: (beanId: number) => api.get(`recom/bean/${beanId}`),
  /** 연령대별 추천 */
  getAgeRecom: (ageRange: string | null) =>
    api.get(`recom/age/${ageRange}/bean`),
};

// 설문조사
export const surveyAPI = {
  /**설문조사 결과 전송 */
  postSurvey: (surveyli: number[]) =>
    api.post(`member/survey`, {
      param1: surveyli[0],
      param2: surveyli[1],
      param3: surveyli[2],
      param4: surveyli[3],
      param5: surveyli[4],
      param6: surveyli[5],
      param7: surveyli[6],
      param8: surveyli[7],
    }),
};

export const memberAPI = {
  /** 사용자 프로필 조회 */
  memberInfo: () => api.get(`member/profile`),
  /**사용자 원두 좋아요 조회 */
  memberLikesBeans: () => api.get(`member/like/mylist?itemType=bean`),
  /**사용자 캡슐 좋아요 조회 */
  memberLiskeCapsules: () => api.get(`member/like/mylist?itemType=capsule`),
  /**사용자 리뷰 쓴거 조회 */
  memberReviews: (pages: string) => api.get(`member/review?${pages}`),
  /**사용자 성향 분석 조회 */
  memberSurvey: () => api.get(`/member/analysis`),
};
export const detailLikeAPI = {
  /**사용자 원두 좋아요 */
  beanLike: (id: number) => api.get(`member/like/toggle/bean/${id}`),
};
