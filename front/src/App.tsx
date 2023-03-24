import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Navbar from './components/navbarandfoot/Navbar';
import Footer from './components/navbarandfoot/Footer';
import Router from './Router';
import './App.css';

function App() {
  const [pageRoute, setPageRout] = useState<boolean>(false);
  // const [nn, setNN] = useState<number>(9);
  // console.log(pageRoute);
  if (pageRoute === true) {
    return (
      <div className="App">
        <Navbar />
        <MainContainer>
          <Router />
        </MainContainer>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <ContentContainer>
          <Router />
        </ContentContainer>
        <Footer />
      </div>
    );
  }
}

const ContentContainer = tw.div`mt-10vh min-h-90vh flex flex-col`;
const MainContainer = tw.div`mt-10vh h-90vh flex flex-col`;
export default App;
