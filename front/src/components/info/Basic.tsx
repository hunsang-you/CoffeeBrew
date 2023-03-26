import tw from 'tailwind-styled-components';
import CardComponent from './Card';

const Basic = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <CardComponent />
      <CardComponent />
      <CardComponent />
    </div>
  );
};

export default Basic;
