import tw from 'tailwind-styled-components';
import Navbar from './components/navbarandfoot/Navbar';
import Footer from './components/navbarandfoot/Footer';
import Router from './Router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ContentContainer>
        <Router />
      </ContentContainer>
      <Footer />
      {/* { isMain && <Footer />} */}
    </div>
  );
}

const ContentContainer = tw.div`mt-10vh min-h-90vh flex flex-col`;
export default App;
