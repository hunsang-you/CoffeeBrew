import tw from 'tailwind-styled-components';
import Navbar from './components/navbarandfoot/Navbar';
import Footer from './components/navbarandfoot/Footer';
import Router from './Router';
import { useState, useEffect } from 'react';
import './App.css';
import hypeboy from './assets/hypeboy.mp3';

function App() {
  const [isFooter, setIsFooter] = useState(false);
  useEffect(() => {
    const audio = new Audio(hypeboy);
    audio.loop = true;
    audio.play();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Router setIsFooter={setIsFooter} />
      {isFooter && <Footer />}
    </div>
  );
}

export default App;
