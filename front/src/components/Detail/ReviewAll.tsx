import tw from 'tailwind-styled-components';
import ReviewLists from './ReviewList';
import ReviewCreate from './ReviewCreate';

const ReviewAll = () => {
  return (
    <div>
      <ReviewCreate />
      <ReviewLists />
    </div>
  );
};

export default ReviewAll;
