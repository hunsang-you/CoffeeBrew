import tw from 'tailwind-styled-components';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';

const CreateReviewBtn = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mx-auto text-xl`;
const CreateReviewDiv = tw.div`w-1040 h-fit flex-col mx-auto drop-shadow-2xl`;
const SliderDiv = tw.div`flex justify-center my-2 mx-2 drop-shadow-md`;

const Submit = tw.div`w-40 h-10 rounded-full bg-red-200 my-6 mx-auto`;

const ReviewCreate = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const handleClickOpen = () => {
    setOpenCreate(!openCreate);
    if (openCreate === false) {
      setReviewTitle('');
      setReviewContent('');
      setScoreValue([3, 3, 3, 3, 3]);
    }
  };

  const [reviewTitle, setReviewTitle] = useState('');
  const changeTitle = (e: any) => {
    setReviewTitle(e.target.value);

    console.log(reviewTitle);
  };

  const [reviewContent, setReviewContent] = useState('');
  const changeContent = (e: any) => {
    setReviewContent(e.target.value);
    console.log(reviewContent);
  };

  const standards = ['향', '산미', '단맛', '쓴맛', '바디감'];

  const [scoreValue, setScoreValue] = useState<number[]>([3, 3, 3, 3, 3]);
  const standardItem = () => {
    const Item = standards.map((item: string, i: number) => {
      return (
        <SliderDiv
          key={i}
          style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '24px' }}
        >
          <div style={{ marginRight: '8px' }}>{item}</div>
          <Box width={150} key={i}>
            <Slider
              key={i}
              defaultValue={3}
              max={5}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, value) => {
                const newScoreValue: number[] = [...scoreValue];
                newScoreValue[i] = value as number;
                setScoreValue(newScoreValue);
                console.log(scoreValue);
              }}
              sx={{
                color: '#9A6533',
              }}
            />
          </Box>
          <div style={{ marginLeft: '20px' }}>{scoreValue[i]}</div>
        </SliderDiv>
      );
    });
    return Item;
  };

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
                <div style={{ marginTop: '50%' }}>{standardItem()}</div>
              </div>
            </div>

            <div>
              <div
                style={{
                  flexDirection: 'row',
                  maxWidth: '400',
                  marginLeft: '12px',
                  marginTop: '24px',
                }}
              >
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 2, width: '600px' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    InputProps={{
                      style: {
                        border: '6px solid #BCA3A3',
                        borderRadius: '40px',
                        boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.35)',
                        fontSize: '20px',
                        padding: '4px',
                      },
                    }}
                    placeholder="작성할 제목을 입력하세요"
                    onChange={changeTitle}
                  />
                </Box>
              </div>
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
                  placeholder="리뷰를 작성하세요"
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
                  'reviewTitle ::',
                  reviewTitle,
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
