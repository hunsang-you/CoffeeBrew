import tw from 'tailwind-styled-components';
import MyReviewItem from './MyReviewItem';

const MyReviewBody = tw.div`border-2 rounded-b-lg text-center  mb-4`;
const MyReview = () => {
  return (
    <MyReviewBody style={{ border: 'solid 4px #06AACE' }}>
      내가 단 리뷰 페이지
      <MyReviewItem />
    </MyReviewBody>
  );
};

export default MyReview;
