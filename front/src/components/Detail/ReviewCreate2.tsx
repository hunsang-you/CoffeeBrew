import tw from 'tailwind-styled-components';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const CreateReviewBtn = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mr-auto text-xl`;
const CreateReviewDiv = tw.div`w-1040 h-fit flex-col mx-auto`;

const ImageBox = tw.div`w-40 h-40 rounded-full bg-slate-400`;
const EditBtn = tw.div`w-20 h-6 bg-pinkColor my-4 mx-auto text-center rounded-xl`;
const SliderDiv = tw.div`flex justify-center my-2 mx-2 `;

const ReviewCreate2 = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const handleClickOpen = () => {
    setOpenCreate(!openCreate);
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

  return (
    <div>
      <CreateReviewBtn onClick={handleClickOpen}>
        {openCreate ? '등록 취소' : '리뷰 등록'}
      </CreateReviewBtn>
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
              <ImageBox
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              ></ImageBox>

              <EditBtn> 등록 </EditBtn>
              <div
                style={{
                  width: '280px',
                  border: 'solid 1px',
                  margin: 'auto',
                }}
              >
                <SliderDiv
                  id="flavor"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  <div style={{ marginRight: '8px' }}>향</div>
                  <SliderSizes />
                </SliderDiv>
                <SliderDiv
                  id="acidity"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  <div style={{ marginRight: '8px' }}>산미</div>
                  <SliderSizes />
                </SliderDiv>
                <SliderDiv
                  id="sweetness"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  <div style={{ marginRight: '8px' }}>단맛</div>
                  <SliderSizes />
                </SliderDiv>
                <SliderDiv
                  id="bitterness"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  <div style={{ marginRight: '8px' }}>쓴맛</div>
                  <SliderSizes />
                </SliderDiv>
                <SliderDiv
                  id="body"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  <div style={{ marginRight: '8px' }}>바디감</div>
                  <SliderSizes />
                </SliderDiv>
              </div>
            </div>
            <div>
              <div
                style={{
                  flexDirection: 'row',
                  maxWidth: '400',
                  marginLeft: '24px',
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
                    width: 600,
                    minHeight: 280,
                    maxHeight: 280,
                    border: 'solid 8px #CBAC97',
                    borderRadius: '24px',
                    marginLeft: '24px',
                    resize: 'none',
                    padding: '24px',
                  }}
                  onChange={changeContent}
                />
              </Box>
            </div>
          </div>
        </CreateReviewDiv>
      ) : null}
      <button
        onClick={() =>
          console.log(
            'reviewTitle ::',
            reviewTitle,
            'reviewContent ::',
            reviewContent,
          )
        }
      >
        11
      </button>
    </div>
  );
};

export default ReviewCreate2;

export function SliderSizes() {
  return (
    <Box width={150}>
      <Slider
        defaultValue={3}
        max={5}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e, value) => {
          console.log(value);
        }}
      />
    </Box>
  );
}
