import { useState } from 'react';

const Carousel = () => {
  const slides = ['#33a', '#8c9', '#f3e074'];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="slider-area">
      <div className="slider">
        <div className="slider-list">
          <div
            className="slider-track"
            style={{
              transform: `translateX(${
                (-100 / slides.length) * (0.5 + currentIndex)
              }%)`,
            }}
          >
            {slides.map((color, index) => (
              <div key={index} className="slider-item">
                <a>
                  <div style={{ background: color }}>{index}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
