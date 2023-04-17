import './style.css';

const images = [
  null,
  '/img/icons/Sunny.png',
  '/img/icons/MostlySunny.png',
  '/img/icons/MostlySunny.png',
  '/img/icons/MostlySunny.png',
  '/img/icons/MostlySunny.png',
  '/img/icons/MostlySunny.png',
  '/img/icons/Cloudy.png',
  '/img/icons/Cloudy.png',
  'nothing',
  'nothing',
  '/img/icons/Cloudy.png',
  '/img/icons/Showers.png',
  '/img/icons/MostlyCloudyShowers.png',
  '/img/icons/PartlySunnyShowers.png',
  '/img/icons/T-Storms.png',
  '/img/icons/MostlyCloudyT-Storms.png',
  '/img/icons/PartlySunnyT-Storms.png',
  '/img/icons/Rain.png',
  '/img/icons/Flurries.png',
  '/img/icons/MostlyCloudyFlurries.png',
  '/img/icons/PartlySunnyFlurries.png',
  '/img/icons/Snow.png',
  '/img/icons/MostlyCloudySnow.png',
  '/img/icons/Ice.png',
  '/img/icons/Sleet.png',
  '/img/icons/FreezingRain.png',
  'nothing',
  'nothing',
  '/img/icons/RainandSnow.png',
  '/img/icons/Hot.png',
  '/img/icons/Cold.png',
  '/img/icons/Windy.png',
  '/img/icons/Clear.png',
  '/img/icons/MostlyClear.png',
  '/img/icons/MostlyClear.png',
  '/img/icons/MostlyClear.png',
  '/img/icons/MostlyClear.png',
  '/img/icons/MostlyClear.png',
  '/img/icons/PartlyCloudyShowers.png',
  '/img/icons/MostlyCloudyShowers-1.png',
  '/img/icons/PartlyCloudyT-Storms.png',
  '/img/icons/MostlyCloudyT-Storms-1.png',
  '/img/icons/MostlyCloudyFlurries-1.png',
  '/img/icons/MostlyCloudyFlurries-1.png',
  '/img/icons/moskow-weather.png'
];

function WeatherImage({ type }) {
  const imagePath = images[type];

  if (!imagePath) {
    return null;
  }

  return <img src={imagePath} alt={`Weather type ${type}`} />;
}

export default WeatherImage;
