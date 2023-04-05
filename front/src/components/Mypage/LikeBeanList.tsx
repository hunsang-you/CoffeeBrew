import tw from 'tailwind-styled-components/';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { memberAPI, detailAPI } from '../../api/api';
import { detailType } from '../Detail/DetailBean';
// 예시 이미지
import bean2 from '../../assets/tempImg/bean.png';
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
  const [likeBeans, setLikeBeans] = useState<detailType[]>([]);
  const [beanIdx, setBeanIdx] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLikesBean = async () => {
      await memberAPI.memberLikesBeans().then((request) => {
        const likes = request.data.value;
        if (likes.length > 0) {
          console.log('testlog');
          const beanLikes = likes.filter(
            (like: like) => like.itemType === 'bean',
          );
          const beanLikesIdx = beanLikes.map((like: like) => like.itemIdx);
          Promise.all(
            beanLikesIdx.map((beanIdx: number) => {
              return detailAPI.getBean(Number(beanIdx)).then((request) => {
                return request.data.value;
              });
            }),
          )
            .then((likedBeans) => {
              console.log(likedBeans);
              setLikeBeans([...likedBeans]);
              setBeanIdx([...beanLikesIdx]);
            })
            .catch((e) => console.log(e));
          // likes.map((like: like) => {
          //   if (like.itemType === 'bean') {
          //     let tempIdxArr = beanIdx;
          //     setBeanIdx([...tempIdxArr, like.itemIdx]);
          //     detailAPI
          //       .getBean(Number(like.itemIdx))
          //       .then((request) => {
          //         console.log(request.data);
          //         let temp = likeBeans;
          //         setLikeBeans([...temp, request.data.value]);
          //       })
          //       .catch((e) => console.log(e));
          //   }
          // });
        } else {
          setLikeBeans([]);
        }
      });
    };
    getLikesBean();
  }, [isLikeCheck]);

  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };

  return (
    <div>
      <List>
        {likeBeans.length > 0 ? (
          likeBeans.map((bean: detailType, i: number) => {
            return (
              <CardBody>
                <BeanImg src={bean2} alt="bean" />
                <CardContent style={{ backgroundColor: '#FFF0CE' }}>
                  <div
                    style={{
                      wordBreak: 'break-word',
                      overflow: 'scroll',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <BeanName>{bean.nameKo}</BeanName>
                    <BeanCountry>원산지 : {bean.origin}</BeanCountry>
                    <BeanDescription>{bean.description}</BeanDescription>
                  </div>
                </CardContent>
                <FixedDiv
                  style={{
                    bottom: 0,
                    backgroundColor: 'rgb(0, 0, 0, 0.7)',
                  }}
                >
                  <AiFillHeart
                    size={42}
                    style={{
                      color: 'red',
                      marginLeft: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      detailAPI
                        .beanLike(Number(beanIdx[i]))
                        .then((request) => {
                          console.log('좋아요 해제');
                          handleLike();
                        })
                        .catch((e) => console.log(e));
                    }}
                  />

                  {/* {isLikeCheck ? null : (
                    <AiOutlineHeart
                      size={42}
                      style={{
                        color: 'gray',
                        marginLeft: '8px',
                        paddingTop: '8px',
                      }}
                      onClick={() => handleLike()}
                    />
                  )} */}
                  <LinkBtn
                    onClick={() => {
                      navigate(`/detail/${beanIdx[i]}`);
                    }}
                  >
                    상세보기
                  </LinkBtn>
                </FixedDiv>
              </CardBody>
            );
          })
        ) : (
          <div>좋아요한 원두가 없습니다.</div>
        )}
      </List>
    </div>
  );
};

export default LikeBeanList;

const List = tw.div`flex max-w-fit mb-10 justify-evenly mt-4 select-none break-words`;
const CardBody = tw.div`w-52 mx-3 flex-col relative`;
const BeanImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const BeanName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const BeanCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const BeanDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
