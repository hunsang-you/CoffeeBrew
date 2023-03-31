import tw from 'tailwind-styled-components';

const BeanLikeBody = tw.div`border-2 rounded-b-lg text-center`;

const BeanLike = () => {
  return (
    <BeanLikeBody style={{ border: 'solid 4px #03C846' }}>
      커피 좋아요
    </BeanLikeBody>
  );
};

export default BeanLike;
