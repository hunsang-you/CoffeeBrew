import tw from 'tailwind-styled-components';
import ReviewCreate from './ReviewCreate';
import Review from './ReviewList';
import ReviewCreate2 from './ReviewCreate2';

const ReviewAll = () => {
  return (
    <div>
      {/* <ReviewCreate /> */}
      <ReviewCreate2 />
      <Review />
    </div>
  );
};

export default ReviewAll;
