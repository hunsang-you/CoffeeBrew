import tw from 'tailwind-styled-components';

const MyReviewBody = tw.div`border-2 rounded-b-lg text-center`;
const MyReview = () => {
  return (
    <MyReviewBody style={{ border: 'solid 4px #06AACE' }}>
      내가 단 리뷰 페이지
    </MyReviewBody>
  );
};

export default MyReview;
