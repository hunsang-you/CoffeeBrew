import tw from 'tailwind-styled-components';
import CoffeeCard from '../CoffeeCard';

interface TastProps {
  taste: string;
}

const RecommendCard = (props: TastProps) => {
  return (
    <OuterCard>
      <TopCard>
        <CoffeeCard taste={props.taste} />
      </TopCard>
      <UnderCard>
        <CardTitle>{props.taste}</CardTitle>
        <CardText>text</CardText>
      </UnderCard>
    </OuterCard>
  );
};

export default RecommendCard;

const OuterCard = tw.div`w-1/6 rounded-xl mx-5`;
const TopCard = tw.div`flex items-center justify-center rounded-t-xl`;
const UnderCard = tw.div`flex flex-col items-center justify-center bg-mainOrige rounded-xl p-3`;
const CardTitle = tw.div`text-3xl text-white`;
const CardText = tw.div`text-xl text-white`;
