import Pagination from 'react-js-pagination';
import '../ProductList/Paging.css';
import { memberAPI } from '../../api/api';
import { ReviewPageType } from './MyReview';

interface PropsTypes {
  pagination: ReviewPageType;
  setPagination: React.Dispatch<React.SetStateAction<ReviewPageType | null>>;
  setReviewPage: React.Dispatch<React.SetStateAction<string>>;
  reviewPage: string;
}

const ReviewPaging = ({
  pagination,
  setPagination,
  setReviewPage,
  reviewPage,
}: PropsTypes) => {
  const handlePageChange = (page: number) => {
    const getPages = async (words: string) => {
      await memberAPI
        .memberReviews(words)
        .then((request) => {
          setPagination(request.data.value);
          console.log(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    setReviewPage((prevWords) => {
      getPages(`page=${page - 1}`);
      return `page=${page - 1}`;
    });
  };
  return (
    <Pagination
      activePage={pagination.number + 1}
      itemsCountPerPage={pagination.size}
      totalItemsCount={pagination?.totalElements}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
      hideDisabled={true}
    />
  );
};

export default ReviewPaging;
