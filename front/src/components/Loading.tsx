import Spinner from '../assets/Coffee-1s-221px.gif';
import tw from 'tailwind-styled-components';

const Loading = () => {
  return (
    <LoadingDiv>
      <div style={{ textAlign: 'center' }}>
        <img src={Spinner} alt="로딩중" />
      </div>
    </LoadingDiv>
  );
};

export default Loading;

const LoadingDiv = tw.div`absolute h-screen w-screen top-0 z-100 flex items-center justify-center flex-col `;
