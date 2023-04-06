import tw from 'tailwind-styled-components';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { reviewAPI } from '../../api/api';

const CreateReviewBtn = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mx-auto text-xl mb-4`;
const CreateReviewDiv = tw.div`w-1040 h-fit flex-col mx-auto drop-shadow-2xl`;
const SliderDiv = tw.div`flex justify-center mx-2 drop-shadow-md`;

const Submit = tw.div`w-40 h-10 rounded-full bg-red-200 my-6 mx-auto`;

const ReviewCreate = () => {
  const reviewRef = useRef<HTMLDivElement>(null);
  const moveReview = () => {
    if (reviewRef.current) {
      const location: number = reviewRef.current.offsetTop;
      window.scrollTo({ top: location - 100, behavior: 'smooth' });
    }
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleClickOpen = () => {
    setOpenCreate(!openCreate);
    if (openCreate === false) {
      setReviewContent('');
      setScoreValue([3, 3, 3, 3, 3, 3]);
    }
  };

  const [reviewContent, setReviewContent] = useState('');
  const changeContent = (e: any) => {
    setReviewContent(e.target.value);
    console.log(reviewContent);
  };

  const standards = ['향', '산미', '단맛', '쓴맛', '바디감', '평점'];

  const [scoreValue, setScoreValue] = useState<number[]>([3, 3, 3, 3, 3, 3]);
  const standardItem = () => {
    const Item = standards.map((item: string, i: number) => {
      return (
        <SliderDiv
          key={i}
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '16px',
          }}
        >
          <div
            style={{ marginLeft: 'auto', marginRight: '8px', width: '60px' }}
          >
            {item}
          </div>
          <Box width={150} key={i}>
            <Slider
              key={i}
              defaultValue={3}
              max={5}
              step={0.5}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, value) => {
                const newScoreValue: number[] = [...scoreValue];
                newScoreValue[i] = value as number;
                setScoreValue(newScoreValue);
              }}
              sx={{
                color: '#9A6533',
              }}
            />
          </Box>
          <div style={{ marginLeft: 'auto', width: '20px' }}>
            {scoreValue[i]}
          </div>
        </SliderDiv>
      );
    });
    return Item;
  };
  const { beanId } = useParams() as { beanId: string };

  return (
    <div>
      {openCreate ? null : (
        <CreateReviewBtn onClick={handleClickOpen}>
          <div style={{ fontWeight: 'bold' }}> 리뷰 등록 </div>{' '}
        </CreateReviewBtn>
      )}

      {openCreate ? (
        <CreateReviewDiv>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              width: '920px',
              margin: 'auto',
              marginTop: '24px',
            }}
          >
            당신의 리뷰를 남겨주세요
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  width: '280px',
                }}
              >
                <div style={{ marginTop: '10%' }}>{standardItem()}</div>
              </div>
            </div>

            <div>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2, width: '600px' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="리뷰를 작성하세요. 입력하지 않아도 됩니다"
                  style={{
                    width: 580,
                    minHeight: 320,
                    maxHeight: 320,
                    border: 'solid 8px #CBAC97',
                    borderRadius: '24px',
                    marginLeft: '32px',
                    resize: 'none',
                    padding: '24px',
                  }}
                  onChange={changeContent}
                />
              </Box>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {openCreate ? (
              <CreateReviewBtn onClick={handleClickOpen}>
                <div style={{ fontWeight: 'bold' }}> 취 소 </div>
              </CreateReviewBtn>
            ) : null}

            <Submit
              onClick={() =>
                console.log(
                  'reviewContent ::',
                  reviewContent,
                  'score',
                  scoreValue,
                )
              }
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  reviewAPI
                    .createBeanReview(
                      Number(beanId), // 원두ID
                      'bean',
                      reviewContent, // 내용
                      Number(scoreValue[5]) * 2, // 총점
                      Number(scoreValue[0]) * 2, // 향
                      Number(scoreValue[1]) * 2, // 산미
                      Number(scoreValue[2]) * 2, // 단맛
                      Number(scoreValue[3]) * 2, // 쓴맛
                      Number(scoreValue[4]) * 2, // 바디감
                    )
                    .then((request) => {
                      window.location.reload();
                      console.log('리뷰 전송 :', request.data);
                      moveReview();
                    })
                    .catch((e) => console.log(e));
                }}
              >
                작성 완료
              </div>
            </Submit>
          </div>
        </CreateReviewDiv>
      ) : null}
    </div>
  );
};
export default ReviewCreate;
