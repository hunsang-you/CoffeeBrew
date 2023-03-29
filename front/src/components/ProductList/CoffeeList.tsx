import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bean from '../../assets/bean.png';
import axios from 'axios';

const ListDiv = tw.div`text-center my-10`;

const ProductList = tw.div`flex justify-between mx-20 mb-4 `;
const ProductItemT = tw.div`w-72 h-400 justify-center rounded-t-2xl mb-8 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 `;
const ProductItemT1 = tw(ProductItemT)`bg-brownBorder rounded-b-2xl`;
const ProductItemImg = tw.img`w-32 h-48  mx-auto mt-4  `;

const ProductItemB = tw.div`w-72 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl`;
const ProductItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-xl `;
const ProductItemEngName = tw.div`text-productTextBrown font-bold break-words mx-4 `;
const ProductInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;

const CoffeeList = () => {
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
    '#9A6533',
  ];

  const navigate = useNavigate();

  return (
    <ListDiv>
      <ProductList>
        <ProductItemT1 style={{ backgroundColor: BackColor[0] }}>
          <ProductItemImg src={bean} onClick={() => navigate('/detail')} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>RestBean</ProductItemEngName>
            <ProductInfo>
              맛있게 볶은 스타벅스의 비싼 원두 맛있게 돌리고 섞은 비싼 원두 볶은
              스타벅스의 비싼 원두볶은 스타벅스의 싼 원두두두두 볶은 스타벅스의
              비싼 원두볶은 스타벅스의 비싼 원두 볶은 스타벅스의 비싼 원두볶은
              스타벅스의 비싼 원두
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[1] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[2] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
      </ProductList>
      <ProductList>
        <ProductItemT1 style={{ backgroundColor: BackColor[3] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>RestBean</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[4] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[5] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
      </ProductList>
      <ProductList>
        <ProductItemT1 style={{ backgroundColor: BackColor[0] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>RestBean</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
              <p> 볶은 스타벅스의 비싼 원두볶은 스타벅스의 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[1] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
        <ProductItemT1 style={{ backgroundColor: BackColor[2] }}>
          <ProductItemImg src={bean} />
          <ProductItemB>
            <ProductItemName>레스트빈</ProductItemName>
            <ProductItemEngName>레스트빈</ProductItemEngName>
            <ProductInfo>
              <p> 맛있게 볶은 스타벅스의 비싼 원두</p>
              <p> 맛있게 돌리고 섞은 비싼 원두</p>
            </ProductInfo>
          </ProductItemB>
        </ProductItemT1>
      </ProductList>
    </ListDiv>
  );
};

export default CoffeeList;
