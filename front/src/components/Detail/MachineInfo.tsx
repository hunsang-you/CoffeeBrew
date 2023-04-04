import tw from 'tailwind-styled-components';
import machine1 from '../../assets/tempImg/machine1.png';

// const RecOther = tw.div`w-1040  flex justify-between `;
const RecMachine = tw.div`flex-col w-460 justify-center bg-gradient-to-br from-recMachine1 to-recMachine2 mx-auto rounded-3xl drop-shadow-2xl`;
const RecMachineImg = tw.img`w-60 h-60 rounded-full my-4 mx-auto`;
const MachineBtn = tw.button`w-52 h-16 bg-pinkColor rounded-full text-white my-4 mx-auto drop-shadow-xl`;
const MachineInfo = () => {
  return (
    <RecMachine>
      <RecMachineImg src={machine1} alt="machine" onClick={() => {}} />
      <div style={{ fontSize: '24px', marginTop: '24px', color: '#A71717' }}>
        드롱기 디스틴타 드립 커피 메이커
      </div>
      <MachineBtn>
        <div style={{ fontSize: '24px', margin: 'auto' }}>보러가기 →</div>
      </MachineBtn>
    </RecMachine>
  );
};

export default MachineInfo;
