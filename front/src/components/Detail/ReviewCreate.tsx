import tw from 'tailwind-styled-components';
import { useState, useCallback, useRef } from 'react';
import ratingfull from '../../assets/ratingfull.png';
import ratinghalf from '../../assets/ratinghalf.png';
import ratingempty from '../../assets/ratingempty.png';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const CreateReview = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mr-auto text-xl`;

const ImageBox = tw.div`w-40 h-40 rounded-full bg-slate-400`;
const EditBtn = tw.div`w-20 h-6 bg-pinkColor my-4 mx-auto text-center rounded-xl`;
const SliderDiv = tw.div`flex justify-center my-2 mx-2 `;

const ReviewCreate = () => {
  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  // 작성모달 open
  const [openCreate, setOpenCreate] = useState(false);
  const handleClickOpen = () => {
    setOpenCreate(true);
  };
  const handleClose = () => {
    setOpenCreate(false);
  };

  const [reviewTitle, setReviewTitle] = useState('');
  const ChangeTitle = (e: any) => {
    setReviewTitle(e.target.value);
    console.log(reviewTitle);
  };

  const [content, setContent] = useState('');
  // dialog
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  // X 닫기버튼
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  // 이미지 등록
  const [profile, setProfile] = useState('../../assets/Coffeebrew.svg');

  return (
    <div>
      <CreateReview onClick={handleClickOpen}> 리뷰 등록 </CreateReview>

      <BootstrapDialog
        aria-labelledby="ReviewCreate"
        open={openCreate}
        PaperProps={{
          style: {
            minWidth: '960px',
          },
        }}
      >
        <BootstrapDialogTitle id="Custom-ReviewTitle" onClose={handleClose}>
          <div style={{ fontSize: '24px', width: '920px' }}>
            당신만의 리뷰를 남겨주세요
          </div>
        </BootstrapDialogTitle>
        <div style={{ display: 'flex', width: '960px' }}>
          <DialogContent dividers style={{ display: 'flex' }}>
            {/* 이미지 등록 */}
            <div style={{ width: '240px' }}>
              <ImageBox
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              ></ImageBox>

              <EditBtn> 등록 </EditBtn>
              <input></input>
              {/* 점수 */}
              <div>
                <div
                  style={{
                    width: '220px',
                    border: 'solid 1px',
                    borderColor: 'gray',
                    margin: 'auto',
                  }}
                >
                  <SliderDiv id="flavor">
                    <div style={{ marginRight: '8px' }}>향</div>
                    <SliderSizes />
                  </SliderDiv>
                  <SliderDiv id="acidity">
                    <div style={{ marginRight: '8px' }}>산미</div>
                    <SliderSizes />
                  </SliderDiv>
                  <SliderDiv id="sweetness">
                    <div style={{ marginRight: '8px' }}>단맛</div>
                    <SliderSizes />
                  </SliderDiv>
                  <SliderDiv id="bitterness">
                    <div style={{ marginRight: '8px' }}>쓴맛</div>
                    <SliderSizes />
                  </SliderDiv>
                  <SliderDiv id="body">
                    <div style={{ marginRight: '8px' }}>바디감</div>
                    <SliderSizes />
                  </SliderDiv>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  flexDirection: 'column',
                  maxWidth: '600',
                  marginLeft: '24px',
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
                      },
                    }}
                    placeholder="작성할 제목을 입력하세요"
                    value={reviewTitle}
                    onChange={ChangeTitle}
                  />
                </Box>
                {/* <Box
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
                      border: 'solid 4px #CBAC97',
                      borderRadius: '24px',
                      marginLeft: '24px',
                      resize: 'none',
                    }}
                    onChange={(e: any) => {
                      setContent(e.target.value);
                    }}
                  />
                </Box> */}
                <button onClick={() => console.log(reviewTitle)}> 11</button>
              </div>
            </div>
          </DialogContent>
        </div>

        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}> */}
          <Button
            onClick={() => {
              console.log('reviewTitle :', reviewTitle, content);
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ReviewCreate;

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

export function TitleTextFields() {
  const [title, setTitle] = useState('');
  const createTitle = (e: any) => {
    setTitle(e.target.value);
    console.log('title ::', title);
  };
  return (
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
          },
        }}
        placeholder="작성할 제목을 입력하세요"
        onChange={(e) => {
          createTitle(e);
        }}
      />
    </Box>
  );
}

export function ContentTextFields() {
  const [content, setContent] = useState('');

  const createContent = (e: any) => {
    setContent(e.target.value);
    console.log('content ::', content);
  };
  return (
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
          border: 'solid 4px #CBAC97',
          borderRadius: '24px',
          marginLeft: '24px',
          resize: 'none',
        }}
        onChange={createContent}
      />
    </Box>
  );
}
