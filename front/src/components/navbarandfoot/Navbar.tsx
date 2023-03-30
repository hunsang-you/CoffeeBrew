import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setNavbar, AppDispatch } from '../../store';
import { useOnHoverOutside } from '../../hooks/useOnHoverOutside';
import Logo from '../../assets/Coffeebrew.svg';
import tw from 'tailwind-styled-components';
import { DropDown } from './DropDown';
import { LoginModal } from '../login/Login';
import hypeboy from '../../assets/hypeboy.mp3';
import MyProfile from './MyProfile';
import ProfileDropDown from './ProfileDropDown';

const Navbar = () => {
  const reduxData = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    dispatch(setNavbar(location.pathname));
  }, [location, dispatch]);
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu); //full dropdwon hovering
  const playMusic = () => {
    const audio = new Audio(hypeboy);
    audio.loop = true;
    audio.play();
  };
  return (
    <div
      className=""
      ref={dropdownRef}
      onMouseOver={() => setMenuDropDownOpen(true)}
      onMouseOut={() => setMenuDropDownOpen(false)} //외부로나갔을때 사라지게
    >
      <NavBa>
        <div className="flex w-1200 mx-auto justify-between ">
          <NDiv
            onClick={() => {
              navigate('/');
              setMenuDropDownOpen(false);
              setIsClick(false);
            }}
          >
            <img src={Logo} width={60} height={60} alt="no_img" />
            <button
              onClick={() => {
                playMusic();
              }}
            >
              음악재생
            </button>
          </NDiv>
          <div className="flex flex-row w-2/3 justify-between">
            <NDiv
              className={`${
                reduxData.navbar.indexOf('intro') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/intro');
                setIsClick(false);
                setMenuDropDownOpen(false);
              }}
            >
              커피브루 소개
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('info') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/info');
                setIsClick(false);
                setMenuDropDownOpen(false);
              }}
            >
              커피 이야기
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('coffeelist') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/coffeelist');
                setIsClick(false);
                setMenuDropDownOpen(false);
              }}
            >
              구경하기
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('survey') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/survey');
                setIsClick(false);
                setMenuDropDownOpen(false);
              }}
            >
              원두 성향 테스트
            </NDiv>
            <NDiv
              className="text-mainColorBrown"
              onMouseOver={(e) => {
                e.stopPropagation();
                setMenuDropDownOpen(false);
              }}
            >
              {reduxData.login === false ? (
                <LoginModal />
              ) : (
                <MyProfile isClick={isClick} setIsClick={setIsClick} />
              )}
            </NDiv>
          </div>
        </div>
      </NavBa>
      {isMenuDropDownOpen && (
        <DropDown setMenuDropDownOpen={setMenuDropDownOpen} />
      )}
    </div>
  );
};

const NavBa = tw.div`fixed top-0 h-10vh w-screen flex bg-navColor z-50`;
const NDiv = tw.div` flex justify-center items-center text-base cursor-default hover:text-mainColorOrange font-bold`;

export default Navbar;
