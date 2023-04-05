import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import capsule from '../../assets/tempImg/capsule.png';
import { detailAPI } from '../../api/api';
import { CapsuleDetailType } from './DetailCapsule';

const RecommendCapsule = () => {
  const { capsuleId } = useParams() as { capsuleId: string };
  const [recommendCapsuleList, setRecommendCapsuleList] = useState<
    CapsuleDetailType[] | null
  >(null);
  useEffect(() => {
    const recomBean = async () => {
      await detailAPI
        .recommendCapsule(Number(capsuleId))
        .then((request) => {
          console.log(request.data);
          setRecommendCapsuleList(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    recomBean();
  }, []);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
  ];
  return (
    <ListDiv>
      <RecomList>
        {recommendCapsuleList
          ? recommendCapsuleList?.map((data, i) => {
              return (
                <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
                  <RecomItemImg src={capsule} />
                  <RecomItemB>
                    <RecomItemName>{data.capsule.nameKo}</RecomItemName>
                    <RecomInfo>
                      <div>{data.capsule.summary}</div>
                    </RecomInfo>
                  </RecomItemB>
                </RecomItemT1>
              );
            })
          : null}
      </RecomList>
    </ListDiv>
  );
};

export default RecommendCapsule;
const ListDiv = tw.div` text-center`;

const RecomList = tw.div` flex mx-auto mb-4 `;
const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
