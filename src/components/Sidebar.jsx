// src/components/Sidebar.jsx
/* eslint-disable react/prop-types */

function Sidebar({
  theme,
  onThemeModeChange,
  onGradientChange,
  onSolidColorChange,
  units,
  onUnitsChange,
  favorites,
  currentCity,
  onAddFavorite,
  onSelectFavorite,
  onRemoveFavorite,
}) {
  const { mode, gradientColors, solidColor } = theme;

  const handleGradientColorChange = (key) => (e) => {
    onGradientChange({
      ...gradientColors,
      [key]: e.target.value,
    });
  };

  const handleSolidColorChange = (e) => {
    onSolidColorChange(e.target.value);
  };

  const isMetric = units === "metric";

  return (
    <aside
      className="
        hidden md:flex
        flex-col
        w-52
        mr-2
        rounded-[24px]
        bg-slate-900/30
        border border-white/25
        backdrop-blur-lg
        py-6 px-4
        text-sm
      "
    >
      {/* SECTIONS / CITIES */}
      <p className="font-semibold text-slate-50 text-xs mb-2">SECTIONS</p>
      <div className="space-y-2 mb-4">
        <div
          className="
            w-full px-3 py-2 rounded-xl
            flex items-center gap-2
            bg-white/90 text-slate-900 font-semibold shadow
          "
        >
          <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
          <span>Cities</span>
        </div>
      </div>

      {/* FAVORITES */}
      <p className="font-semibold text-slate-50 text-xs mb-1">FAVORITES</p>
      <button
        type="button"
        onClick={onAddFavorite}
        className="
          mb-2 text-xs px-3 py-1 rounded-full
          bg-sky-500/90 hover:bg-sky-400
          text-white font-medium
        "
      >
        + Save “{currentCity}”
      </button>

      <div className="mb-5 max-h-40 overflow-y-auto pr-1 space-y-1">
        {favorites.length === 0 && (
          <p className="text-[11px] text-slate-300/80">
            Save cities you often check so you can switch quickly.
          </p>
        )}

        {favorites.map((city) => (
          <div
            key={city}
            className="
              flex items-center justify-between
              rounded-lg bg-white/5 px-2 py-1
              hover:bg-white/10 transition
            "
          >
            <button
              type="button"
              onClick={() => onSelectFavorite(city)}
              className="text-xs text-slate-50 flex-1 text-left truncate"
            >
              {city}
            </button>
            <button
              type="button"
              onClick={() => onRemoveFavorite(city)}
              className="
                ml-1 text-[10px] px-1 rounded
                text-slate-300 hover:text-red-300
              "
              aria-label={`Remove ${city}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* UNITS */}
      <p className="font-semibold text-slate-50 text-xs mb-1">UNITS</p>
      <div className="mb-4 space-y-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="units"
            value="metric"
            checked={isMetric}
            onChange={() => onUnitsChange("metric")}
            className="accent-sky-400"
          />
          <span>°C, km/h</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="units"
            value="imperial"
            checked={!isMetric}
            onChange={() => onUnitsChange("imperial")}
            className="accent-sky-400"
          />
          <span>°F, mph</span>
        </label>
      </div>

      {/* THEME CONTROLS */}
      <p className="font-semibold text-slate-50 text-xs mb-2">THEME</p>

      <div className="mb-3 space-y-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="themeMode"
            value="gradient"
            checked={mode === "gradient"}
            onChange={() => onThemeModeChange("gradient")}
            className="accent-sky-400"
          />
          <span>Gradient</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="themeMode"
            value="solid"
            checked={mode === "solid"}
            onChange={() => onThemeModeChange("solid")}
            className="accent-sky-400"
          />
          <span>Single color</span>
        </label>
      </div>

      {mode === "gradient" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-100">Start</span>
            <input
              type="color"
              value={gradientColors.from}
              onChange={handleGradientColorChange("from")}
              className="w-9 h-9 p-0 border border-white/20 rounded-md bg-transparent cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-100">End</span>
            <input
              type="color"
              value={gradientColors.to}
              onChange={handleGradientColorChange("to")}
              className="w-9 h-9 p-0 border border-white/20 rounded-md bg-transparent cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-100">Color</span>
          <input
            type="color"
            value={solidColor}
            onChange={handleSolidColorChange}
            className="w-9 h-9 p-0 border border-white/20 rounded-md bg-transparent cursor-pointer"
          />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
