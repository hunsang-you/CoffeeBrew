import tw from 'tailwind-styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface DropDownMenuType {
  setMenuDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 풀드랍다운컴포넌트 */
export const DropDown = ({ setMenuDropDownOpen }: DropDownMenuType) => {
  const reduxData = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  return (
    <DropOuter>
      <div className="flex w-1200 mx-auto justify-end cursor-default text-mainColorBrown font-bold">
        <div className="flex flex-col w-dropdown mb-10 mt-5 ">
          <div className="flex flex-row ml-dropdown justify-start items-center my-2">
            <div
              className={`${
                reduxData.navbar.indexOf('intro') !== -1
                  ? 'underline underline-offset-4'
                  : null
              } w-dropdownbrew hover:text-mainColorOrange`}
              onClick={() => {
                navigate('/intro');
                setMenuDropDownOpen(false);
              }}
            >
              서비스 소개
            </div>
            <div
              className={`${
                reduxData.navbar.indexOf('info') !== -1 &&
                reduxData.navbar.indexOf('word') === -1 &&
                reduxData.navbar.indexOf('map') === -1
                  ? 'underline underline-offset-4'
                  : null
              } w-dropdownstory hover:text-mainColorOrange`}
              onClick={() => {
                navigate('/info');
                setMenuDropDownOpen(false);
              }}
            >
              커피의역사
            </div>
            <div
              className={`${
                reduxData.navbar.indexOf('bean') !== -1
                  ? 'underline underline-offset-4'
                  : null
              } w-dropdownlist hover:text-mainColorOrange`}
              onClick={() => {
                navigate('/coffeelist/bean');
                setMenuDropDownOpen(false);
              }}
            >
              원두 구경하기
            </div>
            <div className=" hover:text-mainColorOrange">
              내게 맞는 원두 찾기
            </div>
          </div>
          <div className="flex flex-row ml-dropdown justify-start items-center my-2">
            <div
              className={`${
                reduxData.navbar.indexOf('info') !== -1 &&
                reduxData.navbar.indexOf('word') !== -1
                  ? 'underline underline-offset-4'
                  : null
              } w-dropdownstory ml-dropdown1 hover:text-mainColorOrange`}
              onClick={() => {
                navigate('/info/word');
                setMenuDropDownOpen(false);
              }}
            >
              커피 관련 용어
            </div>
            <div
              className={`${
                reduxData.navbar.indexOf('capsule') !== -1
                  ? 'underline underline-offset-4'
                  : null
              } hover:text-mainColorOrange`}
              onClick={() => {
                navigate('/coffeelist/capsule');
                setMenuDropDownOpen(false);
              }}
            >
              캡슐 구경하기
            </div>
          </div>
          <div className="flex flex-row ml-dropdown justify-between items-center my-2">
            <div className="ml-dropdown1">
              <div
                className={`${
                  reduxData.navbar.indexOf('info') !== -1 &&
                  reduxData.navbar.indexOf('map') !== -1
                    ? 'underline underline-offset-4'
                    : null
                } hover:text-mainColorOrange`}
                onClick={() => {
                  navigate('/info/map');
                  setMenuDropDownOpen(false);
                }}
              >
                지도로 보는 커피
              </div>
            </div>
          </div>
        </div>
      </div>
    </DropOuter>
  );
};

const DropOuter = tw.div`z-50 fixed bg-navColor border-t-orange-300 border-t-2 w-screen animate-fade-in-up`;

//display: flex;
// flex-direction: row;
// justify-content: flex-end;
// align-items: center;
// padding: 4px 0px;
// gap: 8px;
