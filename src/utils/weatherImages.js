// src/utils/weatherImages.js
import SunnyImg from "../assets/Sunny.png";
import CloudyImg from "../assets/Cloudy.png";
import RainyImg from "../assets/Rainy.png";
import StormImg from "../assets/Storm.png";

export const WEATHER_IMAGES = {
  Sunny: SunnyImg,
  Cloudy: CloudyImg,
  Rainy: RainyImg,
  Storm: StormImg,
};

// Map OpenWeather's `main` value to one of our four types
export function getWeatherTypeFromMain(main) {
  switch (main) {
    case "Clear":
      return "Sunny";
    case "Clouds":
      return "Cloudy";
    case "Drizzle":
    case "Rain":
      return "Rainy";
    case "Thunderstorm":
      return "Storm";
    // you can tweak these fallbacks if you like
    case "Snow":
      return "Cloudy";
    default:
      return "Cloudy";
  }
}
