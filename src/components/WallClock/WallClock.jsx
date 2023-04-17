import React, { useState, useEffect } from 'react';
import './style.css';

function WallClock({ sunset, sunrise }) {
  //   const [sunrise, setSunrise] = useState('');
  //   const [sunset, setSunset] = useState('');

  return (
    <div className="rise-set_time">
      <div className="sunrise time-box">
        <p className="namesun">Sunrise</p>
        <div className="time-block">
          <Clock time={sunrise} />
          <p className="time-text">
            {new Date(sunrise).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
      <div className="sunset time-box">
        <p className="namesun">Sunset</p>
        <div className="time-block">
          <Clock time={sunset} />
          <p className="time-text">
            {new Date(sunset).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function Clock({ time }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const date = new Date(time);
    console.log(time);
    setHours(date.getHours());
    setMinutes(date.getMinutes());
  }, [time]);

  const hourHandStyle = {
    transform: `rotate(${(hours % 12) * 30 + minutes / 2}deg)`,
  };
  const minuteHandStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };

  return (
    <div className="clock">
      <div className="clock-face">
        <div className="minute-hand" style={minuteHandStyle}></div>
        <div className="hour-hand" style={hourHandStyle}></div>
      </div>
    </div>
  );
}

export default WallClock;
