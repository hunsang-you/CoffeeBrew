import tw from 'tailwind-styled-components';
import Navbar from './components/navbarandfoot/Navbar';
import Footer from './components/navbarandfoot/Footer';
import Router from './Router';
import { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setLogin, AppDispatch } from './store';

function App() {
  const [isFooter, setIsFooter] = useState(false);
  const reduxData = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken?.indexOf('Bearer') !== -1 && accessToken !== null) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
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
