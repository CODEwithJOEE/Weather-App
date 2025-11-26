/* eslint-disable react/prop-types */
import { WEATHER_IMAGES, getWeatherTypeFromMain } from "../utils/weatherImages";

function formatTemp(celsius, units) {
  if (units === "imperial") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

function formatWind(ms, units) {
  if (units === "imperial") {
    const mph = ms * 2.23694;
    return `${mph.toFixed(1)} mph`;
  }
  const kmh = ms * 3.6;
  return `${kmh.toFixed(1)} km/h`;
}

function LeftPanel({ weather, hourlySlots, units }) {
  const currentTemp = formatTemp(weather.main.temp, units);
  const feelsLike = formatTemp(weather.main.feels_like, units);

  const main = weather.weather[0].main; // e.g. "Clear", "Clouds"
  const type = getWeatherTypeFromMain(main); // "Sunny" | "Cloudy" | ...
  const iconSrc = WEATHER_IMAGES[type];

  return (
    <div className="space-y-6">
      {/* outer card */}
      <div className="bg-slate-900/60 rounded-[24px] px-6 py-6 lg:px-7 lg:py-7 shadow-lg border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-50">
              {weather.name}
            </h1>
            <p className="text-xs lg:text-sm text-slate-200 mt-1">
              Chance of rain: {weather.clouds?.all ?? 0}%
            </p>
            <p className="text-5xl lg:text-6xl font-semibold mt-6 text-slate-50">
              {currentTemp}°
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              src={iconSrc}
              alt={type}
              className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] object-contain"
            />
          </div>
        </div>

        {/* TODAY'S FORECAST */}
        <div className="mt-6 rounded-[20px] px-4 py-4 border border-white/15 bg-slate-900/40 backdrop-blur-sm">
          <p className="text-[10px] lg:text-xs font-semibold tracking-[0.12em] text-slate-300 mb-3">
            TODAY&apos;S FORECAST
          </p>

          <div className="flex justify-between gap-3 md:flex-nowrap flex-wrap">
            {hourlySlots.map(({ label, offset }) => (
              <div
                key={label}
                className="flex flex-col items-center flex-1 min-w-0"
              >
                <span className="text-[10px] font-semibold text-slate-200">
                  {label}
                </span>
                <img
                  src={iconSrc}
                  alt={type}
                  className="w-8 h-8 my-1 object-contain"
                />
                <span className="text-xs text-slate-100">
                  {formatTemp(weather.main.temp + offset, units)}°
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AIR CONDITIONS (no See more, no extra details) */}
        <div className="mt-4 rounded-[20px] px-5 py-4 border border-white/15 bg-slate-900/40 backdrop-blur-sm">
          <p className="text-[10px] lg:text-xs font-semibold tracking-[0.12em] text-slate-300 mb-3">
            AIR CONDITIONS
          </p>

          <div className="grid grid-cols-2 gap-6 text-sm text-slate-100">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-slate-300">Real Feel</p>
                <p className="text-xl">{feelsLike}°</p>
              </div>
              <div>
                <p className="font-medium text-slate-300">Chance of rain</p>
                <p className="text-base">{weather.clouds?.all ?? 0}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-medium text-slate-300">Wind</p>
                <p className="text-base">
                  {formatWind(weather.wind.speed, units)}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-300">UV Index</p>
                <p className="text-base">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
