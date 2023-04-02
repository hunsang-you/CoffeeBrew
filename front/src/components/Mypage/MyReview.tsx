import tw from 'tailwind-styled-components';
import MyReviewItem from './MyReviewItem';

const MyReviewBody = tw.div`rounded-b-lg text-center  mb-4`;
const MyReview = () => {
  return (
    <MyReviewBody style={{ border: 'solid 4px #06AACE' }}>
      <MyReviewItem />
    </MyReviewBody>
  );
};

export default MyReview;
