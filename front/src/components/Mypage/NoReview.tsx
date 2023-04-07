import tw from 'tailwind-styled-components';
import NoReviewImg from '../../assets/tempImg/NoReviewImg.png';
import { useNavigate } from 'react-router-dom';

const NoReview = () => {
  const navigate = useNavigate();

  return (
    <NoReviewBody>
      <NoUserReviewImg>
        <img src={NoReviewImg} alt="noReview" style={{ marginLeft: '35px' }} />
      </NoUserReviewImg>

      <NoComment>아직 남긴 리뷰가 없네요!</NoComment>
      <NoComment>맘에 드는 커피를 찾아 리뷰를 남겨봐요</NoComment>
      <NoLinkBtn
        onClick={() => {
          navigate('/coffeelist/bean');
        }}
      >
        <p style={{ paddingTop: '16px' }}>원두 보러 가기 →</p>
      </NoLinkBtn>
    </NoReviewBody>
  );
};

const NoReviewBody = tw.div`rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserReviewImg = tw.div`w-700 mx-auto`;
const NoLinkBtn = tw.div`w-80 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10"`;

export default NoReview;
