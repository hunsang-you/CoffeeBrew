import tw from 'tailwind-styled-components';
import bean from '../../assets/bean.png';

const ShopList = tw.div`flex justify-between `;
const ShopItemT = tw.div`w-40  border-2 justify-center rounded-t-2xl`;
const ShopItemT1 = tw(ShopItemT)`bg-brownBorder border-0`;
const ShopItemImg = tw.img`w-24 h-24 rounded-full mx-auto mt-2 `;

const ShopItemB = tw(ShopItemT1)`w-40 justify-center bg-navColor mt-2`;
const ShopItemName = tw.div`text-nameColor pt-4 font-bold text-ellipsis overflow-hidden ... whitespace-nowrap mx-1`;
const LinkBtn = tw.button`w-20 h-8 rounded-full bg-black text-white mt-2 mb-4 cursor-pointer hover:bg-slate-500`;
const Shopping = () => {
  return (
    <ShopList>
      <ShopItemT1>
        <ShopItemImg src={bean} />
        <ShopItemB>
          <ShopItemName>
            레스트빈레스트빈레스트빈레스트빈레스트빈레스트빈
          </ShopItemName>
          <LinkBtn>이동</LinkBtn>
        </ShopItemB>
      </ShopItemT1>
      <ShopItemT1>
        <ShopItemImg src={bean} />
        <ShopItemB>
          <ShopItemName>레스트빈</ShopItemName>
          <LinkBtn>이동</LinkBtn>
        </ShopItemB>
      </ShopItemT1>
      <ShopItemT1>
        <ShopItemImg src={bean} />
        <ShopItemB>
          <ShopItemName>레스트빈</ShopItemName>
          <LinkBtn>이동</LinkBtn>
        </ShopItemB>
      </ShopItemT1>
      <ShopItemT1>
        <ShopItemImg src={bean} />
        <ShopItemB>
          <ShopItemName>레스트빈</ShopItemName>
          <LinkBtn>이동</LinkBtn>
        </ShopItemB>
      </ShopItemT1>
      <ShopItemT1>
        <ShopItemImg src={bean} />
        <ShopItemB>
          <ShopItemName>레스트빈</ShopItemName>
          <LinkBtn>이동</LinkBtn>
        </ShopItemB>
      </ShopItemT1>
    </ShopList>
  );
};

export default Shopping;
