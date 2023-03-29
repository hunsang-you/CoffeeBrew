import tw from 'tailwind-styled-components';
import { useState, forwardRef } from 'react';
import grinding2 from '../../assets/grinding2.png';
import grindingList from '../../assets/grindingList.png';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const GrindingDiv = tw.div`flex-row w-460 justify-center bg-gradient-to-r from-grinding1 to-grinding2 mr-10 rounded-3xl drop-shadow-2xl`;
const GrindingImg = tw.img`w-60 h-60 rounded-full mt-4 mx-auto`;
const GrindingInfo = tw.div`mt-6 text-2xl `;
const Question = tw.div`w-12 h-12 mx-auto cursor-pointer mt-8 `;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#F9F5E0',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Grinding = () => {
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(!open);

  return (
    <GrindingDiv>
      <GrindingImg src={grinding2} alt="분쇄도" />
      <GrindingInfo style={{ color: '#B49150' }}> 모카포트</GrindingInfo>
      <GrindingInfo style={{ color: '#B49150' }}>(조금고운 타입)</GrindingInfo>
      <Question onClick={modalOpen}>
        {<AiOutlineQuestionCircle size={50} />}

        <Modal
          open={open}
          onClose={modalOpen}
          aria-labelledby="GrindingImg"
          aria-describedby="GridingDescription"
          closeAfterTransition
        >
          <Box sx={style}>
            <Typography id="GrindingImg" component="h2">
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '32px',
                  color: '#8B4C2A',
                  marginBottom: '24px',
                }}
              >
                분쇄도
              </div>
              <img
                src={grindingList}
                alt="grindingImg"
                style={{ backgroundColor: '#CBAC97', borderRadius: '100px' }}
              />
            </Typography>
            <Typography
              id="GridingDescription"
              sx={{ mt: 4, textAlign: 'center' }}
            >
              설명
            </Typography>
          </Box>
        </Modal>
      </Question>
    </GrindingDiv>
  );
};

export default Grinding;
