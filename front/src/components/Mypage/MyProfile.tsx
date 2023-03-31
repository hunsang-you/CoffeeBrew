import tw from 'tailwind-styled-components';
import { useState } from 'react';
import Analyze from './Analyze';
import BeanLike from './BeanLike';
import MyReview from './MyReview';

const ProfileDiv = tw.div`w-1200 min-h-full  bg-background flex justify-between`;
const ProfileLeft = tw.div`w-80 mt-20 ml-20  bg-nameTag drop-shadow-2xl justify-center rounded-t-full`;
const ProfileRight = tw.div`w-720 flex-col mt-20 ml-8 mr-20  `;
const TypeBar = tw.div`w-720 h-12 flex justify-center text-center relative `;
const TypeBtnOff = tw.div`w-60 h-7  rounded-t-2xl text-white font-bold cursor-pointer absolute bottom-0 ml-0 `;
const TypeBtnOn = tw.div`w-60 h-12  rounded-t-2xl text-white font-bold text-xl cursor-pointer absolute bottom-0 ml-0 `;

const UserImg = tw.div`w-64 h-64 border-8 border-white bg-slate-600 mx-auto rounded-full text-center`;
const UserInfo = tw.div`w-64 mt-6 border-2  rounded-xl bg-navColor  mx-auto`;
const UserDeleteBtn = tw.div`w-fit ml-8 mb-20 text-2xl text-red-600 font-bold cursor-pointer hover:scale-110 duration-300`;

const MyProfile = () => {
  const [typeCheck, setTypeCheck] = useState([true, false, false]);

  return (
    <ProfileDiv>
      <ProfileLeft>
        <UserImg>123</UserImg>
        <UserInfo>
          <div
            style={{
              fontSize: '20px',
              textAlign: 'left',
              marginLeft: '16px',
              marginTop: '16px',
              fontWeight: 'bold',
            }}
          >
            안녕하세요
          </div>
          <div>
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px',
                marginLeft: '8px',
                fontStyle: 'italic',
              }}
            >
              닉네임은10글자까지 <span style={{ fontSize: '20px' }}>님</span>
            </p>
          </div>
        </UserInfo>
        <hr
          style={{
            marginTop: '24px',
            marginBottom: '24px',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: 'solid 1px',
            width: '80%',
          }}
        />
        <UserInfo style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              marginTop: '16px',
              marginLeft: '16px',
              marginRight: '50%',
              marginBottom: '16px',
            }}
          >
            ·Menu·
          </div>
          <UserDeleteBtn onClick={() => console.log('탈퇴 alert창')}>
            회원 탈퇴
          </UserDeleteBtn>
        </UserInfo>
      </ProfileLeft>
      <ProfileRight>
        <TypeBar>
          {typeCheck[0] === true ? (
            <TypeBtnOn style={{ backgroundColor: '#FD0F0F', left: 0 }}>
              <div style={{ height: '48px', alignContent: 'middle' }}>
                <p>분 석</p>
              </div>
            </TypeBtnOn>
          ) : (
            <TypeBtnOff
              style={{ backgroundColor: '#FD0F0F', left: 0 }}
              onClick={() => setTypeCheck([true, false, false])}
            >
              <div style={{ margin: 'auto' }}>
                <p>분 석</p>
              </div>
            </TypeBtnOff>
          )}
          {typeCheck[1] === true ? (
            <TypeBtnOn style={{ backgroundColor: '#03C846', left: 240 }}>
              좋 아 요
            </TypeBtnOn>
          ) : (
            <TypeBtnOff
              style={{ backgroundColor: '#03C846', left: 240 }}
              onClick={() => setTypeCheck([false, true, false])}
            >
              좋 아 요
            </TypeBtnOff>
          )}
          {typeCheck[2] === true ? (
            <TypeBtnOn style={{ backgroundColor: '#06AACE', left: 480 }}>
              리 뷰
            </TypeBtnOn>
          ) : (
            <TypeBtnOff
              style={{ backgroundColor: '#06AACE', left: 480 }}
              onClick={() => setTypeCheck([false, false, true])}
            >
              리 뷰
            </TypeBtnOff>
          )}
        </TypeBar>
        {typeCheck[0] === true ? <Analyze /> : null}
        {typeCheck[1] === true ? <BeanLike /> : null}
        {typeCheck[2] === true ? <MyReview /> : null}
      </ProfileRight>
    </ProfileDiv>
  );
};

export default MyProfile;
