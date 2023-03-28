import tw from 'tailwind-styled-components';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Logo from '../../assets/Coffeebrew.svg';
import { fontWeight } from '@mui/system';

const CreateReviewBtn = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mr-auto text-xl`;
const CreateReviewDiv = tw.div`w-1040 h-fit flex-col mx-auto drop-shadow-2xl`;
const ImageBox = tw.div`w-48 h-48 rounded-full`;

const EditBtn = tw.button`w-24 h-10 bg-pinkColor my-4 mx-auto text-center rounded-xl`;
const Label = tw.label`w-full h-full text-lg font-bold text-white flex items-center justify-center cursor-pointer`;
const SliderDiv = tw.div`flex justify-center my-2 mx-2 drop-shadow-md`;

const Submit = tw.div`w-40 h-10 rounded-full bg-red-200 my-6 mx-auto`;

const ReviewCreate2 = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const handleClickOpen = () => {
    setOpenCreate(!openCreate);
    if (openCreate === false) {
      setReviewTitle('');
      setReviewContent('');
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

  // 파일 업로드 작업을 수행
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = event.target.files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setPreviewImage(preview);
        setIsProfile(true);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);

      // 파일 업로드 작업을 수행합니다.
    }
  };
  return (
    <div>
      <CreateReviewBtn onClick={handleClickOpen}>
        {openCreate ? (
          <div style={{ fontWeight: 'bold' }}> 취 소 </div>
        ) : (
          <div style={{ fontWeight: 'bold' }}> 리뷰 등록 </div>
        )}
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
              {isProfile ? (
                <ImageBox style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  {previewImage && (
                    <div>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          borderRadius: '1000px',
                          maxWidth: '200px',
                          minWidth: '200px',
                          maxHeight: '200px',
                          minHeight: '200px',
                        }}
                      />
                    </div>
                  )}
                </ImageBox>
              ) : (
                <img
                  src={Logo}
                  style={{
                    width: '200px',
                    margin: 'auto',
                  }}
                />
              )}

              <EditBtn>
                <Label htmlFor="image-upload">
                  이미지 첨부
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </Label>
              </EditBtn>
              <div
                style={{
                  width: '280px',
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
          <Submit
            onClick={() =>
              console.log(
                'reviewTitle ::',
                reviewTitle,
                'reviewContent ::',
                reviewContent,
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
        </CreateReviewDiv>
      ) : null}
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
