import tw from 'tailwind-styled-components';
import MyReviewItem from './MyReviewItem';
import { memberAPI } from '../../api/api';
import { useEffect, useState } from 'react';

export interface ReviewPageType {
  content: ReviewType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElments: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
}

export interface ReviewType {
  itemType: string;
  itemName: string;
  content: string | null;
  overall: number;
  flavor: number;
  acidity: number;
  sweetness: number;
  bitterness: number;
  body: number;
  coffeeing_note: string | null;
  like: number | null;
  expired: boolean | null;
  createdDate: number[] | null;
  updatedDate: number[] | null;
  member_idx: number;
}

// export interface memberType {
//   ageRange: string | null;
//   createdDate: number[] | null;
//   updatedDate: number[] | null;
//   expired: boolean | null;
//   gender: string | null;
//   profileImg: string;
//   memberEmail: string;
//   nickname: string;
//   hashcode: string;
//   snsType: string;
//   role: string | null;
//   idx: number | null;
// }

const MyReviewBody = tw.div`rounded-b-lg text-center  mb-4`;
const MyReview = () => {
  const [memberReviews, setMemberReviews] = useState<ReviewPageType | null>(
    null,
  );

  useEffect(() => {
    const getMemberReviews = async () => {
      await memberAPI.memberReviews('page=0').then((request) => {
        console.log(request.data.value);
        setMemberReviews(request.data.value);
      });
    };
    getMemberReviews();
  }, []);

  return (
    <MyReviewBody style={{ border: 'solid 4px #06AACE' }}>
      {memberReviews
        ? memberReviews.content.map((data, i) => {
            return <MyReviewItem reviewData={data} />;
          })
        : null}
    </MyReviewBody>
  );
};

export default MyReview;
