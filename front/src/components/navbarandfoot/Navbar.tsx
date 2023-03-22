import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnHoverOutside } from '../../hooks/useOnHoverOutside';
import tw from 'tailwind-styled-components';
import { DropDown } from './DropDown';
import { LoginModal } from '../login/Login';

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };
  useOnHoverOutside(dropdownRef, closeHoverMenu);
  return (
    <div
      ref={dropdownRef}
      onMouseOver={() => setMenuDropDownOpen(true)}
      onMouseOut={() => setMenuDropDownOpen(false)} //외부로나갔을때 사라지게
    >
      <NavBa>
        <div className="flex w-1200 mx-auto justify-between px-5">
          <NDiv
            onClick={() => {
              navigate('/');
              setMenuDropDownOpen(false);
            }}
          >
            <img src={'Coffeebrew.svg'} width={60} height={52} alt="no_img" />
          </NDiv>
          <div className="flex flex-row w-2/3 justify-between">
            <NDiv
              onClick={() => {
                navigate('/intro');
                setMenuDropDownOpen(false);
              }}
            >
              커피브루 소개
            </NDiv>
            <NDiv
              onClick={() => {
                navigate('/info');
                setMenuDropDownOpen(false);
              }}
            >
              커피 이야기
            </NDiv>
            <NDiv
              onClick={() => {
                navigate('/coffeelist');
                setMenuDropDownOpen(false);
              }}
            >
              구경하기
            </NDiv>
            <NDiv
              onClick={() => {
                navigate('/survey');
                setMenuDropDownOpen(false);
              }}
            >
              원두 성향 테스트
            </NDiv>
            {/* <NDiv
            onClick={() => {
              navigate('/mypage');
              setMenuDropDownOpen(false);
            }}
          >
            임시마이페이지
          </NDiv> */}
            <NDiv
              onMouseOver={(e) => {
                e.stopPropagation();
                setMenuDropDownOpen(false);
              }}
            >
              <LoginModal />
            </NDiv>
          </div>
        </div>
      </NavBa>
      {isMenuDropDownOpen && <DropDown />}
    </div>
  );
};

const NavBa = tw.div`fixed top-0 h-10vh w-screen flex bg-navColor z-50`;
const NDiv = tw.div` flex justify-center items-center text-base cursor-default text-navFontColor hover:text-blue-600 font-bold`;

export default Navbar;
