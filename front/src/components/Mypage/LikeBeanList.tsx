import tw from 'tailwind-styled-components/';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { memberAPI, detailAPI } from '../../api/api';
import { detailType } from '../Detail/DetailBean';
// 예시 이미지
import bean from '../../assets/tempImg/bean.png';
import bean2 from '../../assets/tempImg/bean2.png';
import dogprofile from '../../assets/tempImg/dogprofile.png';
import grinding2 from '../../assets/tempImg/grinding2.png';

interface like {
  idx: number;
  itemType: string;
  itemIdx: number;
  expired: boolean;
}

const LikeBeanList = () => {
  const [isLikeCheck, setIsLikeCheck] = useState(true);
  const [likeBeans, setLikeBeans] = useState<detailType | null>(null);

  useEffect(() => {
    const getLikesBean = async () => {
      await memberAPI.memberLikesBeans().then((request) => {
        const likes = request.data.value;
        if (likes.length > 0) {
          likes.map((like: like) => {
            if (like.itemType === 'bean') {
              detailAPI
                .getBean(Number(like.itemIdx))
                .then((request) => {
                  console.log(request.data);
                })
                .catch((e) => console.log(e));
            }
          });
        }
      });
    };
    getLikesBean();
  }, []);

  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };

  return (
    <div>
      <List>
        <CardBody>
          <BeanImg src={bean} alt="bean" />
          <CardContent style={{ backgroundColor: '#FFF0CE' }}>
            <div
              style={{
                wordBreak: 'break-word',
                overflow: 'scroll',
                textOverflow: 'ellipsis',
              }}
            >
              <BeanName>원두 이름원두</BeanName>
              <BeanCountry>원산지 : 에티오피아</BeanCountry>
              <BeanDescription>
                이 원두는 영국에서 넘어왔으며 지구를 7바퀴 돌아이 원두는
              </BeanDescription>
            </div>
          </CardContent>
          <FixedDiv
            style={{
              bottom: 0,
              backgroundColor: 'rgb(0, 0, 0, 0.7)',
            }}
          >
            {isLikeCheck ? (
              <AiFillHeart
                size={42}
                style={{
                  color: 'red',
                  marginLeft: '8px',
                  paddingTop: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => handleLike()}
              />
            ) : null}
            {isLikeCheck ? null : (
              <AiOutlineHeart
                size={42}
                style={{ color: 'gray', marginLeft: '8px', paddingTop: '8px' }}
                onClick={() => handleLike()}
              />
            )}
            <LinkBtn> 상세보기 </LinkBtn>
          </FixedDiv>
        </CardBody>
      </List>
    </div>
  );
};

export default LikeBeanList;

const List = tw.div`flex max-w-fit mb-10 justify-evenly mt-4 select-none`;
const CardBody = tw.div`w-52 mx-3 flex-col relative`;
const BeanImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const BeanName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const BeanCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const BeanDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
