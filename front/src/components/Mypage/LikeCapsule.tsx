import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { memberAPI, detailAPI } from '../../api/api';
import { CapsuleDetailType } from '../detailcapsule/DetailCapsule';

import bean2 from '../../assets/tempImg/bean2.png';

interface like {
  idx: number;
  itemType: string;
  itemIdx: number;
  expired: boolean;
}

const LikeCapsuleList = () => {
  const [isLikeCheck, setIsLikeCheck] = useState(true);
  const [likeCapsules, setLikeCapsules] = useState<CapsuleDetailType[]>([]);
  const [capsuleIdx, setCapsuleIdx] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLikesCapsule = async () => {
      await memberAPI.memberLiskeCapsules().then((request) => {
        const likes = request.data.value;
        if (likes.length > 0) {
          console.log('testlog');
          const capsuleLikes = likes.filter(
            (like: like) => like.itemType === 'capsule',
          );
          const capsuleLikesIdx = capsuleLikes.map(
            (like: like) => like.itemIdx,
          );
          Promise.all(
            capsuleLikesIdx.map((capsuleIdx: number) => {
              return detailAPI
                .getCapsule(Number(capsuleIdx))
                .then((request) => {
                  return request.data.value;
                });
            }),
          )
            .then((likedCapsules) => {
              console.log(likedCapsules);
              setLikeCapsules([...likedCapsules]);
              setCapsuleIdx([...capsuleLikesIdx]);
            })
            .catch((e) => console.log(e));
        } else {
          setLikeCapsules([]);
        }
      });
    };
    getLikesCapsule();
  }, [isLikeCheck]);

  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };

  return (
    <List style={{ display: 'flex', flexWrap: 'wrap' }}>
      {likeCapsules.length > 0 ? (
        likeCapsules.map((capsule: CapsuleDetailType, i: number) => {
          return (
            <CardBody>
              <CapsuleImg src={bean2} alt="bean" />
              <CardContent style={{ backgroundColor: '#FFF0CE' }}>
                <div
                  style={{
                    wordBreak: 'break-word',
                    overflow: 'scroll',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <CapsuleName>{capsule.capsule.nameKo}</CapsuleName>
                  <CapsuleCountry>
                    회사: {capsule.capsuleDetail.company}
                  </CapsuleCountry>
                  <CapsuleDescription>
                    {capsule.capsuleDetail.description}
                  </CapsuleDescription>
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
                      .capsuleLike(Number(capsuleIdx[i]))
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
                    navigate(`/detail/capsule/${capsuleIdx[i]}`);
                  }}
                >
                  상세보기
                </LinkBtn>
              </FixedDiv>
            </CardBody>
          );
        })
      ) : (
        <div>좋아요한 캡슐이 없습니다.</div>
      )}
    </List>
  );
};

export default LikeCapsuleList;

const List = tw.div`flex max-w-fit mb-10 mt-4 select-none break-words`;
const CardBody = tw.div`w-52 mx-3 my-4 flex-col relative`;
const CapsuleImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const CapsuleName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const CapsuleCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const CapsuleDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
