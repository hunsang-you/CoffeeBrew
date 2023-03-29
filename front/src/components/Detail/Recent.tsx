import tw from 'tailwind-styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bean from '../../assets/bean.png';
import bean2 from '../../assets/bean2.png';
import grinding2 from '../../assets/grinding2.png';

const RecentSearch = () => {
  const Items = [
    '케냐AA',
    '파푸아 뉴기니',
    '스타벅스',
    '케냐AA',
    '파푸아 뉴기니',
  ];

  const Item = () =>
    Items.map((item: string, index: number) => {
      return (
        <RecentItem key={index}>
          <BeanImg1
            src={bean}
            style={{
              borderRadius: '48px',
              marginTop: '16px',
              marginBottom: '16px',
            }}
          />
          <p style={{ fontSize: '16px' }}>{item}</p>
        </RecentItem>
      );
    });

  return <RecentItems style={{ marginLeft: '80px' }}>{Item()}</RecentItems>;
};

export default RecentSearch;
// 최근항목
const RecentItems = tw.div`flex text-lg font-bold justify-start`;
const RecentItem = tw.div` w-40 justify-center mx-5 text-ellipsis overflow-hidden`;
const BeanImg1 = tw.img`object-cover mt-10 drop-shadow-xl`;
