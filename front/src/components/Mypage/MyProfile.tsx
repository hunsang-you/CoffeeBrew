import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import Analyze from './Analyze';
import BeanLike from './BeanLike';
import MyReview from './MyReview';
import { memberAPI, loginAPI } from '../../api/api';
import dogprofile from '../../assets/tempImg/dogprofile.png';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProfileDiv = tw.div`w-1200   bg-background flex justify-between`;
const ProfileLeft = tw.div`w-80 mt-20 ml-20  bg-nameTag drop-shadow-2xl justify-center rounded-t-full`;
const ProfileRight = tw.div`w-720 flex-col mt-20 ml-8 mr-20  `;
const TypeBar = tw.div`w-720 h-12 flex justify-center text-center relative `;
const TypeBtnOff = tw.div`w-60 h-7  rounded-t-2xl text-white font-bold cursor-pointer absolute bottom-0 ml-0 `;
const TypeBtnOn = tw.div`w-60 h-12  rounded-t-2xl text-white font-bold text-xl cursor-pointer absolute bottom-0 ml-0 drop-shadow-2xl `;

const UserImg = tw.div`w-64 h-64 border-8 border-white bg-slate-600 mx-auto rounded-percent overflow-hidden text-center`;
const UserInfo = tw.div`w-64 mt-6 border-2  rounded-xl bg-navColor  mx-auto`;
const UserMenuBtn = tw.button`w-fit ml-8 mb-6 text-2xl font-bold cursor-pointer hover:scale-110 duration-300`;

export interface SurveyType {
  acidity: number;
  bitterness: number;
  body: number;
  coffeeing_note: string | null;
  expired: boolean;
  flavor: number;
  param1: number | null;
  param2: number | null;
  param3: number | null;
  param4: number | null;
  param5: number | null;
  param6: number | null;
  param7: number | null;
  param8: number | null;
  resultCode: string;
  resultType: string;
  sweetness: number;
}

const MyProfile = () => {
  const [typeCheck, setTypeCheck] = useState([true, false, false]);
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const reduxData = useSelector((state: RootState) => state);
  useEffect(() => {
    const getInfo = async () => {
      await memberAPI
        .memberInfo()
        .then((request) => console.log(request))
        .catch((e) => console.log(e));
      await memberAPI
        .memberReviews('page=0')
        .then((request) => console.log(request))
        .catch((e) => console.log(e));
      await memberAPI
        .memberSurvey()
        .then((request) => {
          console.log(request.data);
          setSurvey(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);

  return (
    <ProfileDiv style={{ minHeight: '100vh' }}>
      <ProfileLeft style={{ maxHeight: '680px' }}>
        <UserImg>
          <img
            src={
              reduxData.memberInfo == null
                ? dogprofile
                : reduxData.memberInfo.profileImg || ''
            }
            className="object-cover w-full h-full"
          />
        </UserImg>
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
              {reduxData.memberInfo != null
                ? reduxData.memberInfo.nickname
                : null}{' '}
              <span style={{ fontSize: '20px' }}>님</span>
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <UserMenuBtn
              onClick={() => {
                loginAPI
                  .logout()
                  .then((request) => {
                    window.localStorage.clear();
                    window.location.replace('/');
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              로그아웃
            </UserMenuBtn>
            <UserMenuBtn
              style={{ color: 'red' }}
              onClick={() =>
                Swal.fire({
                  title: '회원탈퇴 하시겠습니까?',
                  text: '모든 정보가 삭제 됩니다.',
                  icon: 'warning',
                  showCancelButton: false,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '네 탈퇴하겠습니다.',
                }).then((result) => {
                  if (result.isConfirmed) {
                    loginAPI
                      .withdraw()
                      .then((request) => {
                        window.localStorage.clear();
                        window.location.replace('/');
                      })
                      .catch((e) => console.log(e));
                  }
                })
              }
            >
              회원탈퇴
            </UserMenuBtn>
          </div>
        </UserInfo>
      </ProfileLeft>
      <ProfileRight>
        <TypeBar>
          {typeCheck[0] === true ? (
            <TypeBtnOn style={{ backgroundColor: '#FD0F0F', left: 0 }}>
              <div style={{ marginTop: '12px' }}>
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
              <div style={{ marginTop: '12px' }}>좋 아 요</div>
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
              <div style={{ marginTop: '12px' }}>리 뷰</div>
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
        {typeCheck[0] === true && survey ? <Analyze survey={survey} /> : null}
        {typeCheck[1] === true ? <BeanLike /> : null}
        {typeCheck[2] === true ? <MyReview /> : null}
      </ProfileRight>
    </ProfileDiv>
  );
};

export default MyProfile;
