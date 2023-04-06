import tw from 'tailwind-styled-components';
import Navbar from './components/navbarandfoot/Navbar';
import Footer from './components/navbarandfoot/Footer';
import Router from './Router';
import { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setLogin, AppDispatch, setMemberInfo } from './store';
import { memberAPI } from './api/api';

function App() {
  const [isFooter, setIsFooter] = useState(false);
  const reduxData = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken?.indexOf('Bearer') !== -1 && accessToken !== null) {
      dispatch(setLogin(true));
      const getMemberInfo = async () => {
        await memberAPI
          .memberInfo()
          .then((request) => {
            dispatch(setMemberInfo(request.data.value));
          })
          .catch((e) => {
            console.log(e);
            alert('로그인 관련 문제가 생겼으니 재로그인해주세요');
            window.localStorage.clear();
            window.location.reload();
          });
      };
      getMemberInfo();
    } else {
      dispatch(setLogin(false));
      dispatch(setMemberInfo(null));
    }
  }, [reduxData.login]);
  return (
    <div className="App">
      <Navbar />
      <Router setIsFooter={setIsFooter} />
      {isFooter && <Footer />}
    </div>
  );
}

export default App;
