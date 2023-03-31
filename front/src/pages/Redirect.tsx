import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, AppDispatch } from '../store';

const Redirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getToken = async () => {
      try {
        const url = new URL(document.location.href).searchParams;
        const accessToken = url.get('accessToken');
        localStorage.setItem('accessToken', 'Bearer ' + accessToken);
        dispatch(setLogin(true));
        setTimeout(() => navigate('/', { replace: true }), 500);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, [navigate]);
  return <div></div>;
};

export default Redirect;
