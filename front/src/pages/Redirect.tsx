import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAccessToken, AppDispatch } from '../store';

const Redirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getToken = async () => {
      try {
        const url = new URL(document.location.href).searchParams;
        const accessToken = url.get('accessToken');
        dispatch(setAccessToken('Bearer' + accessToken));
        // localStorage.setItem('accessToken', 'Bearer ' + accessToken);
        setTimeout(() => navigate('/', { replace: true }), 500);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);
  return <div></div>;
};

export default Redirect;
