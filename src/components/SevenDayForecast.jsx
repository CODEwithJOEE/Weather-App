import { WEATHER_IMAGES } from "../utils/weatherImages";

function formatTemp(celsius, units) {
  if (units === "imperial") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

function SevenDayForecast({ weather, days, units }) {
  return (
    <div className="rounded-[24px] px-6 py-5 shadow-lg border border-white/25 bg-slate-900/30 backdrop-blur-lg">
      <p className="text-[10px] lg:text-xs font-semibold tracking-[0.12em] text-slate-100 mb-4">
        7-DAY FORECAST
      </p>

      <div className="divide-y divide-white/10">
        {days.map((day, index) => {
          const label =
            index <= 2
              ? "Sunny"
              : index === 3 || index === 4
              ? "Cloudy"
              : index === 5
              ? "Rainy"
              : "Storm";

          const high = formatTemp(weather.main.temp + 3, units);
          const low = formatTemp(weather.main.temp - 3, units);
          const iconSrc = WEATHER_IMAGES[label];

          return (
            <div key={day} className="flex items-center justify-between py-3">
              <span className="text-sm text-slate-100 w-14">{day}</span>

              <div className="flex items-center gap-2 flex-1">
                <img
                  src={iconSrc}
                  alt={label}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs text-slate-200">{label}</span>
              </div>

              <span className="text-xs text-slate-200">
                {high}° / {low}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SevenDayForecast;
