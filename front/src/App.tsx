import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router from './Router';
import './App.css';

const ContentContainer = tw.div`mt-10vh w-1200 h-90vh mx-auto flex flex-col`;
function App() {
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

export default App;
