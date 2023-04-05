import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import tw from 'tailwind-styled-components';
const Main = lazy(() => import('./pages/Main'));
const Detail = lazy(() => import('./pages/Detail'));
const Intro = lazy(() => import('./pages/Intro'));
const Info = lazy(() => import('./pages/Info'));
const MyPage = lazy(() => import('./pages/MyPage'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Survey = lazy(() => import('./pages/Servey'));
const Redirect = lazy(() => import('./pages/Redirect'));

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Router = ({ setIsFooter }: IsFooterType) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <MainContainer>
              <Main setIsFooter={setIsFooter} />
            </MainContainer>
          </Suspense>
        }
      />
      <Route
        path="/detail/*"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer>
              <Detail setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/info/*"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer className="bg-wordimg">
              <Info setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/mypage"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer>
              <MyPage setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/survey"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer>
              <Survey setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/coffeelist/*"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer>
              <ProductList setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/intro"
        element={
          <Suspense fallback={<Loading />}>
            <ContentContainer>
              <Intro setIsFooter={setIsFooter} />
            </ContentContainer>
          </Suspense>
        }
      />
      <Route
        path="/redirect"
        element={
          <Suspense fallback={<Loading />}>
            <Redirect />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Router;

const ContentContainer = tw.div`mt-10vh min-h-90vh flex flex-col`;
const MainContainer = tw.div`mt-10vh h-90vh flex flex-col`;
