import tw from 'tailwind-styled-components';
import { CapsuleReviewType } from './DetailCapsule';
import ReviewLists from './ReviewList';

interface PropsTypes {
  detailReview?: CapsuleReviewType[];
}

const ReviewAll = ({ detailReview }: PropsTypes) => {
  return (
    <div>
      {/* <ReviewCreate /> */}
      <ReviewLists detailReview={detailReview} />
    </div>
  );
};

export default ReviewAll;
