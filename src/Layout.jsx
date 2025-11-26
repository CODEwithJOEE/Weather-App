import bgImage from "./assets/bg.jpg";
import Sidebar from "./components/Sidebar";
import logo from "/logo.webp";
function Layout({
  searchBar,
  left,
  right,
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

  const cardStyle =
    mode === "gradient"
      ? {
          backgroundImage: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
        }
      : { backgroundColor: solidColor };

  return (
    <div
      className="
        min-h-screen relative
        flex flex-col items-center justify-center
        px-4 py-8
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70" />

      {/* TITLE + LOGO */}
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <img
          src={logo}
          alt="Weather App logo"
          className="
    w-12 h-12 md:w-20 md:h-20   /* 👈 bigger on all screens */
    object-contain
    drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]
  "
        />
        <h2
          className="
      text-2xl md:text-3xl font-semibold
      text-slate-100
      drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]
    "
        >
          Weather App
        </h2>
      </div>

      {/* MAIN CARD */}
      <div
        className="
          relative z-10
          w-full max-w-6xl
          rounded-[32px]
          px-4 py-6 lg:px-8 lg:py-8
          shadow-2xl
          text-slate-50
          border border-white/20
        "
        style={cardStyle}
      >
        <div className="flex gap-4 lg:gap-6">
          <Sidebar
            theme={theme}
            onThemeModeChange={onThemeModeChange}
            onGradientChange={onGradientChange}
            onSolidColorChange={onSolidColorChange}
            units={units}
            onUnitsChange={onUnitsChange}
            favorites={favorites}
            currentCity={currentCity}
            onAddFavorite={onAddFavorite}
            onSelectFavorite={onSelectFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />

          <div className="flex-1">
            {searchBar && <div className="mb-6">{searchBar}</div>}

            <div className="grid gap-6 md:grid-cols-5">
              <div className="md:col-span-3">{left}</div>
              <div className="md:col-span-2">{right}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
