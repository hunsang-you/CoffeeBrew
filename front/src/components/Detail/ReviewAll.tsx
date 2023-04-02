import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewLists from './ReviewList';
import ReviewCreate from './ReviewCreate';
import { reviewAPI } from '../../api/api';

const ReviewAll = () => {
  return (
    <div>
      <ReviewCreate />
      <ReviewLists />
    </div>
  );
};

export default ReviewAll;
