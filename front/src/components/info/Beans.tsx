import tw from 'tailwind-styled-components';
import CardComponent from './Card';

const Beans = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <CardComponent />
      <CardComponent />
    </div>
  );
};

export default Beans;
