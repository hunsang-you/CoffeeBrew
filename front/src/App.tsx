import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
    </div>
  );
}

const ContentContainer = tw.div`mt-10vh min-h-90vh flex flex-col`;
export default App;
