import React from 'react';
import tw from 'tailwind-styled-components';

/** 풀드랍다운컴포넌트 */
export const DropDown = () => {
  return (
    <DropOuter>
      <div className="flex w-1200 mx-auto justify-end">
        <div className="flex flex-col w-dropdown mb-10 mt-5 ">
          <div className="flex flex-row ml-dropdown justify-start items-center my-2">
            <div className="w-dropdownbrew">서비스 소개</div>
            <div className="w-dropdownstory">커피의역사</div>
            <div className="w-dropdownlist">원두 구경하기</div>
            <div>내게 맞는 원두 찾기</div>
          </div>
          <div className="flex flex-row ml-dropdown justify-start items-center my-2">
            <div className="w-dropdownstory ml-dropdown1">커피 관련 용어</div>
            <div className="">캡슐 구경하기</div>
          </div>
          <div className="flex flex-row ml-dropdown justify-between items-center my-2">
            <div className="ml-dropdown1">
              <div>지도로 보는 커피</div>
            </div>
          </div>
        </div>
      </div>
    </DropOuter>
  );
};

const DropOuter = tw.div`z-50 fixed bg-navColor border-t-orange-300 border-t-2 w-screen animate-fade-in-up`;

//display: flex;
// flex-direction: row;
// justify-content: flex-end;
// align-items: center;
// padding: 4px 0px;
// gap: 8px;
