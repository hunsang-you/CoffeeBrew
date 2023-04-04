import tw from 'tailwind-styled-components';
import ReviewLists from './ReviewList';
import ReviewCreate from './ReviewCreate';
import { reviewType } from './DetailBean';

interface PropsTypes {
  detailReview?: reviewType[];
}

const ReviewAll = ({ detailReview }: PropsTypes) => {
  return (
    <div>
      <ReviewCreate />
      <ReviewLists detailReview={detailReview} />
    </div>
  );
};

export default ReviewAll;
