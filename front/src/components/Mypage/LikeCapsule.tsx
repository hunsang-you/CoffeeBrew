import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { memberAPI, detailAPI } from '../../api/api';
import { CapsuleDetailType } from '../detailcapsule/DetailCapsule';
import LikeCapsuleListItem from './LikeCapsuleList';

import bean2 from '../../assets/tempImg/bean2.png';
import NoLikeImg from '../../assets/tempImg/NoLikeImg.png';
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

  return (
    <List style={{ display: 'flex', flexWrap: 'wrap' }}>
      {likeCapsules.length > 0 ? (
        likeCapsules.map((capsule: CapsuleDetailType, i: number) => {
          return (
            <LikeCapsuleListItem
              capsule={capsule}
              i={i}
              capsuleIdx={capsuleIdx}
              setIsLikeCheck={setIsLikeCheck}
              isLikeCheck={isLikeCheck}
            />
          );
        })
      ) : (
        <NoLikeBody>
          <NoUserLikeImg>
            <img src={NoLikeImg} alt="noLike" />
          </NoUserLikeImg>

          <NoComment>아직 맘에 드는 캡슐이 없나요??</NoComment>
          <NoLinkBtn
            onClick={() => {
              navigate('/coffeelist/bean');
            }}
          >
            <p style={{ paddingTop: '16px' }}>캡슐 보러 가기 →</p>
          </NoLinkBtn>
        </NoLikeBody>
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

const NoLikeBody = tw.div`rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserLikeImg = tw.div`w-700 mx-auto`;
const NoLinkBtn = tw.div`w-80 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10"`;
