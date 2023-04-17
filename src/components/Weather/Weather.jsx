import React, { useState, useEffect } from 'react';
import './style.css';
import WallClock from '../WallClock/WallClock';
import HalfCircleChart from '../HalfCircleChart/HalfCircleChart';
import WeatherImage from '../WeatherImage/WeatherImage';
import moment from 'moment';
import AnimatedNumber from '../AnimatedNumber/AnimatedNumber';
import Loading from '../Loading/Loading';

const API_KEY = 'YhXG0wP5EB8Xc0HYIxIHCqnlWGtobkK8';

function Weather() {
  const [city, setCity] = useState('Kiev'); // Set default city to Kiev
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [weatherOneDayData, setWeatherOneDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [IsInputFocused, setIsInputFocused] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dayNow, setDayNow] = useState(0);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Отменяем действие по умолчанию
    fetchWeatherData();
  };

  const newDay = (id) =>{
    setDayNow(id);
    fetchWeatherData();
  }

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const locationResponse = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}&language=en-us&details=true`
      );
      const locationData = await locationResponse.json();

      if (locationData.length > 0) {
        const weatherResponse = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationData[0].Key}?apikey=${API_KEY}&language=en-us&details=true`
        );
        const weatherData = await weatherResponse.json();

        const weatherOneDayResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationData[0].Key}?apikey=${API_KEY}&details=true&metric=true`
        );
        const weatherOneDayData = await weatherOneDayResponse.json();

        setLocationData(locationData[0]);
        setWeatherData(weatherData[0]);
        setWeatherOneDayData(weatherOneDayData.DailyForecasts[dayNow]);

        console.log(weatherData[0]);
        console.log(locationData[0]);
        console.log(weatherOneDayData);
        console.log(dayNow);

        const dateStr = weatherData.LocalObservationDateTime;
        const dateObj = moment(dateStr);
        setFormattedDate(dateObj.format("Do MMM 'YY"));
      }
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setLocationData(null);
      setWeatherOneDayData(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        weatherData &&
        locationData && (
          <div className="main">
            <div className="page">
              {locationData.Key === '580845' ? (
                <img src="/img/icons/moskow-weather.png" alt="" />
              ) : (
                <WeatherImage type={weatherData.WeatherIcon} />
              )}
              <p className="temperature">
                {locationData.Key === '580845' ? (
                  <AnimatedNumber number={1500} duration={2} />
                ) : (
                  <AnimatedNumber
                    number={Math.round(weatherData.Temperature.Metric.Value)}
                    duration={2}
                  />
                )}

                <span className="metric">°C</span>
              </p>
              <p className="weather-text">{weatherData.WeatherText}</p>
              <p className="weather-date">{formattedDate}</p>
              <div className="more-info">
                <div className="wind info-block">
                  <img src="img/Wind.svg" alt="" />
                  <p className="info-text">Wind </p>
                  <p className="info-data">
                    <AnimatedNumber
                      number={weatherData.Wind.Speed.Metric.Value}
                      duration={2}
                    />{' '}
                    {weatherData.Wind.Speed.Metric.Unit}
                  </p>
                </div>
                <span className="line-vert"></span>
                <div className="hum info-block">
                  <img src="img/hum.svg" alt="" />
                  <p className="info-text">Hum </p>
                  <p className="info-data">
                    <AnimatedNumber
                      number={weatherData.RelativeHumidity}
                      duration={2}
                    />{' '}
                    %
                  </p>
                </div>
                <span className="line-vert"></span>
                <div className="pressure info-block">
                  <img src="img/pressure.svg" alt="" />
                  <p className="info-text">Pressure</p>
                  <p className="info-data">
                    <AnimatedNumber
                      number={weatherData.Pressure.Metric.Value}
                      duration={2}
                    />{' '}
                    {weatherData.Pressure.Metric.Unit}
                  </p>
                </div>
              </div>
              <div className="other-days">
                <a onClick={(event) => { event.preventDefault(); newDay(1) }} href='/' className="day">1</a>
                <a href="\" className="day">2</a>
                <a href="\" className="day">3</a>
                <a href="\" className="day">4</a>
              </div>
            </div>
            <div className="sidebar" id="wrap">
              <div className="header">
                {weatherData && locationData && !IsInputFocused && (
                  <div className="location">
                    <svg
                      fill="#fff"
                      height="35px"
                      width="35px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 368.666 368.666"
                      xmlSpace="preserve">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="XMLID_2_">
                          <g>
                            <g>
                              <path d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515 c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51 c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355 c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552 c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297 C313.629,178.709,304.004,206.393,285.795,229.355z"></path>{' '}
                              <path d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374 S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374 s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"></path>{' '}
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className="region_name">
                      {locationData.LocalizedName},{' '}
                      {locationData.Country.LocalizedName}
                    </p>
                  </div>
                )}
                <form className="form_get-region" onSubmit={handleSubmit}>
                  <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="City:"
                    value={city}
                    onChange={handleInputChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  <button id="search_submit" type="submit">
                    <img src="img/search.svg" alt="" />
                  </button>
                </form>
              </div>
              {weatherData && locationData && (
                <div className="moredata">
                  <WallClock
                    sunset={weatherOneDayData.Sun.Set}
                    sunrise={weatherOneDayData.Sun.Rise}
                  />
                  <div className="line">
                    <span></span>
                    <a
                      className="link-more-info"
                      target="true"
                      href={weatherData.Link}>
                      <p>i</p>
                    </a>
                  </div>
                  <div className="chart">
                    <div className="chart-block">
                      <p className="chart-text">Air Quality</p>
                      <HalfCircleChart
                        data={weatherOneDayData.AirAndPollen[0]}
                        max={5}
                      />
                    </div>
                    <div className="chart-block">
                      <p className="chart-text">UV Index</p>
                      <HalfCircleChart
                        data={weatherOneDayData.AirAndPollen[5]}
                        max={10}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Weather;
