import tw from 'tailwind-styled-components';
import highlands from '../../assets/ethiopiahighlands.webp';
import ProfileDropDown from './ProfileDropDown';
import { useState, useRef, useEffect } from 'react';
import { loginAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';

interface isClickType {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyProfile = ({ isClick, setIsClick }: isClickType) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="hover:text-mainColorBrown" ref={ref}>
      <div
        className="h-42 w-42 rounded-percent overflow-hidden"
        onClick={() => {
          setIsClick(!isClick);
        }}
      >
        <img
          src={highlands}
          alt="no_img"
          className="w-full h-full object-cover"
        />
      </div>
      {isClick && (
        <ProfileDropDown setIsClick={setIsClick}>
          <div
            className="mb-3 hover:text-mainColorOrange"
            onClick={() => {
              navigate('/mypage');
            }}
          >
            마이페이지
          </div>
          <div
            className="pb-4 hover:text-mainColorOrange"
            onClick={() => {
              loginAPI
                .logout()
                .then((request) => {
                  console.log(request);
                  window.localStorage.clear();
                  window.location.replace('/');
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            로그아웃
          </div>
        </ProfileDropDown>
      )}
    </div>
  );
};

export default MyProfile;
