import React from "react";
import Fullpage, {
  FullPageSections,
  FullpageSection,
  FullpageNavigation,
} from "@ap.cx/react-fullpage";
import bg1 from "./img/bg1.jpg";
import bg3 from "./img/bg3.jpg";

const FullPage = () => {
  const SectionStyle = {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Fullpage>
      <FullpageNavigation />
      <FullPageSections>
        <FullpageSection
          style={{
            ...SectionStyle,
            backgroundImage: `url(${bg1})`,
            backgroundSize: "cover",
          }}
        >
          <h1 style={{ color: "white" }}>Screen 1</h1>
        </FullpageSection>
        <FullpageSection style={SectionStyle}>
          <h1>Screen 2</h1>
        </FullpageSection>
        <FullpageSection
          style={{
            ...SectionStyle,
            backgroundImage: `url(${bg3})`,
            backgroundSize: "cover",
          }}
        >
          <h1 style={{ color: "white" }}>Screen 3</h1>
        </FullpageSection>
      </FullPageSections>
    </Fullpage>
  );
};

export default FullPage;
