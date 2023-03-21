import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnHoverOutside } from '../hooks/useOnHoverOutside';
import tw from 'tailwind-styled-components';
import { Tests } from './Tests';

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };
  useOnHoverOutside(dropdownRef, closeHoverMenu);
  return (
    <NavBa ref={dropdownRef} onMouseOver={() => setMenuDropDownOpen(true)}>
      {isMenuDropDownOpen && <Tests />}
      <NDiv
        onClick={() => {
          navigate('/');
        }}
      >
        임시용 메인가기
      </NDiv>
      <NDiv
        onClick={() => {
          navigate('/intro');
        }}
      >
        커피브루 소개
      </NDiv>
      <NDiv
        onClick={() => {
          navigate('/info');
        }}
      >
        커피 이야기
      </NDiv>
      <NDiv
        onClick={() => {
          navigate('/coffeelist');
        }}
      >
        구경하기
      </NDiv>
      <NDiv
        onClick={() => {
          navigate('/survey');
        }}
      >
        원두 성향 테스트
      </NDiv>
      <NDiv
        onClick={() => {
          navigate('/mypage');
        }}
      >
        임시마이페이지
      </NDiv>
    </NavBa>
  );
};

const NavBa = tw.nav`fixed top-0 h-10vh w-screen flex bg-navColor z-50`;
const NDiv = tw.div`w-full flex justify-center items-center text-base`;

export default Navbar;
