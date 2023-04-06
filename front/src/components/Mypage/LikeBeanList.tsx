import tw from 'tailwind-styled-components/';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { memberAPI, detailAPI } from '../../api/api';
import { detailType } from '../Detail/DetailBean';
import LikeBeanListItem from './LikeBeanListItem';
// 예시 이미지
import bean2 from '../../assets/tempImg/bean.png';
import NoLikeImg from '../../assets/tempImg/NoLikeImg.png';

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
        } else {
          setLikeBeans([]);
        }
      });
    };
    getLikesBean();
  }, [isLikeCheck]);

  return (
    <List style={{ display: 'flex', flexWrap: 'wrap' }}>
      {likeBeans.length > 0 ? (
        likeBeans.map((bean: detailType, i: number) => {
          return (
            <LikeBeanListItem
              bean={bean}
              i={i}
              setIsLikeCheck={setIsLikeCheck}
              isLikeCheck={isLikeCheck}
              beanIdx={beanIdx}
            />
          );
        })
      ) : (
        <NoLikeBody>
          <NoUserLikeImg>
            <img src={NoLikeImg} alt="noLike" />
          </NoUserLikeImg>

          <NoComment>아직 맘에 드는 원두가 없나요??</NoComment>
          <NoLinkBtn
            onClick={() => {
              navigate('/coffeelist/bean');
            }}
          >
            <p style={{ paddingTop: '16px' }}>원두 보러 가기 →</p>
          </NoLinkBtn>
        </NoLikeBody>
      )}
    </List>
  );
};

export default LikeBeanList;

const List = tw.div`flex max-w-fit mb-10 mt-4 select-none break-words`;
const CardBody = tw.div`w-52 mx-3 my-4 flex-col relative`;
const BeanImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const BeanName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const BeanCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const BeanDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;

const NoLikeBody = tw.div`rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserLikeImg = tw.div`w-700 mx-auto`;
const NoLinkBtn = tw.div` w-80 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10"`;
