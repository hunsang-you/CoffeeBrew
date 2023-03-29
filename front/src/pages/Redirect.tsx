import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        const url = new URL(document.location.href).searchParams;
        const accessToken = url.get('accessToken');
        localStorage.setItem('accessToken', 'Bearer ' + accessToken);
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
