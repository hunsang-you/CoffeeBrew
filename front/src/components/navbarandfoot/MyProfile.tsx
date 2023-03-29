import tw from 'tailwind-styled-components';
import highlands from '../../assets/ethiopiahighlands.webp';

const MyProfile = () => {
  return (
    <div className="h-42 w-42 rounded-percent overflow-hidden">
      <img
        src={highlands}
        alt="no_img"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MyProfile;
