import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

function AnimatedNumber({ number, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(number);
  }, [number]);

  return (
    <CountUp end={count} duration={duration} />
  );
}

export default AnimatedNumber;