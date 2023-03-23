import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
const Main = lazy(() => import('./pages/Main'));
const Detail = lazy(() => import('./pages/Detail'));
const Intro = lazy(() => import('./pages/Intro'));
const Info = lazy(() => import('./pages/Info'));
const MyPage = lazy(() => import('./pages/MyPage'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Survey = lazy(() => import('./pages/Servey'));

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        }
      />
      <Route
        path="/detail"
        element={
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        }
      />
      <Route
        path="/info/*"
        element={
          <Suspense fallback={<Loading />}>
            <Info />
          </Suspense>
        }
      />
      <Route
        path="/mypage"
        element={
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        }
      />
      <Route
        path="/survey"
        element={
          <Suspense fallback={<Loading />}>
            <Survey />
          </Suspense>
        }
      />
      <Route
        path="/coffeelist"
        element={
          <Suspense fallback={<Loading />}>
            <ProductList />
          </Suspense>
        }
      />
      <Route
        path="/intro"
        element={
          <Suspense fallback={<Loading />}>
            <Intro />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Router;
