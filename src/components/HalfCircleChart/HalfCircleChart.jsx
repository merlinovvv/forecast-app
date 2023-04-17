import React, { useRef, useEffect } from 'react';
import './style.css';

var ProgressBar = require('progressbar.js');

function HalfCircleChart({ data, max }) {
  const indexSmall = data.Value / max;
  const index = data.Value;
  const category = data.Category;

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const options = {
      strokeWidth: 4,
      color: '#713FFD',
      trailColor: '#e1e1e1',
      trailWidth: 4,
      easing: 'bounce',
      duration: 4000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false,
      },
      from: { color: '#fff' },
      to: { color: '#713FFD' },
    };

    // очистка старого прогрессбара
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // создание нового прогрессбара
    const bar = new ProgressBar.SemiCircle(container, options);

    // анимация нового прогрессбара
    bar.animate(indexSmall);

    // функция очистки прогрессбара
    return () => {
      bar.destroy();
    };
  }, [indexSmall]);

  return (
    <div className="half-circle-progress">
      <div className="brogressbar" ref={containerRef}></div>
      <div className="half-circle-progress-text">
        {index}/{max}
        <br />
        <br />
        {category}
      </div>
    </div>
  );
}

export default HalfCircleChart;
