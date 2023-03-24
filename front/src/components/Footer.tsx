import tw from 'tailwind-styled-components';

const Footer = () => {
  return (
    <Foot>
      <div className="w-1200 h-40 mx-auto px-16">
        <div className="flex py-6 justify-evenly">
          <div className="text-start">
            <p className="my-2">팀 정보</p>
            <Text>팀명 : 발버둥</Text>
            <Text>팀장 : 권동규</Text>
            <Text>팀원 : 배상현 이도겸 이동훈 유헌상 한재욱</Text>
          </div>
          <div className="text-start">
            <p className="my-2">고객센터</p>
            <Text>전화 : 010-5512-3217</Text>
            <Text>이메일 : reatsae0117@gmail.com</Text>
            <Text style={{ color: '#777777' }}>
              Copyright 2023 COFFEEBREW All Rights Reserved.
            </Text>
          </div>
        </div>
      </div>
    </Foot>
  );
};

const Foot = tw.footer`w-screen h-40 bg-fotColor text-center text-white`;
const Text = tw.p`text-xs my-2`;

export default Footer;
