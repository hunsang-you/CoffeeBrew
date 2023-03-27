import tw from 'tailwind-styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bean from '../../assets/bean.png';

// 최근항목
const RecentItems = tw.div`flex text-lg font-bold justify-start`;
const RecentItem = tw.div` w-40 justify-center mx-5 text-ellipsis overflow-hidden`;
const BeanImg1 = tw.img`object-cover mt-10 drop-shadow-xl`;

const RecentSearch = () => {
  return (
    <RecentItems style={{ marginLeft: '80px' }}>
      <RecentItem>
        <BeanImg1
          src={bean}
          style={{
            borderRadius: '48px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        />
        <p style={{ fontSize: '16px' }}>케냐AA</p>
      </RecentItem>
      <RecentItem>
        <BeanImg1
          src={bean}
          style={{
            borderRadius: '48px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        />
        <p>파푸아뉴기니파푸아뉴기니파푸아뉴기니파푸아뉴기니</p>
      </RecentItem>
      <RecentItem>
        <BeanImg1
          src={bean}
          style={{
            borderRadius: '48px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        />
        <p>스타벅스</p>
      </RecentItem>
    </RecentItems>
  );
};

export default RecentSearch;
