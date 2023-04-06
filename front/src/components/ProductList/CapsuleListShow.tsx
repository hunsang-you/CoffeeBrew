import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import capsule from '../../assets/tempImg/capsule.png';
import { CapsuleType } from './CapsuleList';
import CapsuleListShowItem from './CapsuleListShowItem';

interface PropsTypes {
  listDatas: CapsuleType[];
}

const CapsuleListShow = ({ listDatas }: PropsTypes) => {
  return (
    <ListDiv>
      <ProductList>
        {listDatas
          ? listDatas.map((data, i) => {
              return <CapsuleListShowItem data={data} i={i} />;
            })
          : null}
      </ProductList>
    </ListDiv>
  );
};

export default CapsuleListShow;

const ListDiv = tw.div`text-center my-10`;

const ProductList = tw.div`flex mx-20 flex-wrap `;
const ProductItemT = tw.div`w-72 h-400 justify-center rounded-t-2xl my-12 ml-10 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 overflow-scroll`;
const ProductItemT1 = tw(ProductItemT)`bg-brownBorder rounded-b-2xl`;
const ProductItemImg = tw.img`w-32 h-48  mx-auto mt-4  `;

const ProductItemB = tw.div`w-72 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl`;
const ProductItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-xl `;
const ProductItemEngName = tw.div`text-productTextBrown font-bold break-words mx-4 `;
const ProductInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
