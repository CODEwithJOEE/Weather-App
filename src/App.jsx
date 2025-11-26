import { useEffect, useState } from "react";
import { OPENWEATHER_API_KEY } from "./config/api";
import Layout from "./Layout";
import SearchBar from "./components/SearchBar";
import LeftPanel from "./components/LeftPanel";
import SevenDayForecast from "./components/SevenDayForecast";
import "./App.css";
const API_KEY = OPENWEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Manukan");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // THEME STATE
  const [themeMode, setThemeMode] = useState("gradient"); // "gradient" | "solid"
  const [gradientColors, setGradientColors] = useState({
    from: "#a855f7",
    to: "#f9a8d4",
  });
  const [solidColor, setSolidColor] = useState("#1e293b");

  // UNITS: "metric" => °C + km/h, "imperial" => °F + mph
  const [units, setUnits] = useState("metric");

  // FAVORITE CITIES
  const [favorites, setFavorites] = useState([]);

  // 7-day labels
  const days = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // dummy hourly slots
  const hourlySlots = [
    { label: "6:00 AM", offset: -2 },
    { label: "9:00 AM", offset: 0 },
    { label: "12:00 PM", offset: 2 },
    { label: "3:00 PM", offset: 3 },
    { label: "6:00 PM", offset: 1 },
    { label: "9:00 PM", offset: -1 },
  ];

  // load favorites + units from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = JSON.parse(
        window.localStorage.getItem("weather-favorites") ?? "[]"
      );
      if (Array.isArray(storedFavs)) setFavorites(storedFavs);

      const storedUnits = window.localStorage.getItem("weather-units");
      if (storedUnits === "metric" || storedUnits === "imperial") {
        setUnits(storedUnits);
      }
    } catch (e) {
      console.warn("Failed to load settings", e);
    }
  }, []);

  // persist favorites + units to localStorage
  useEffect(() => {
    window.localStorage.setItem("weather-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem("weather-units", units);
  }, [units]);

  // fetch weather when city changes
  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("Could not load weather for that city.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  // search handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setCity(searchValue.trim());
    setSearchValue("");
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  // favorites handlers
  const handleAddFavorite = () => {
    const name = city.trim();
    if (!name) return;
    if (favorites.includes(name)) return;
    setFavorites((prev) => [...prev, name]);
  };

  const handleSelectFavorite = (favCity) => {
    setCity(favCity);
  };

  const handleRemoveFavorite = (favCity) => {
    setFavorites((prev) => prev.filter((c) => c !== favCity));
  };

  const searchBar = (
    <SearchBar
      value={searchValue}
      onChange={handleSearchChange}
      onSubmit={handleSearchSubmit}
    />
  );

  const leftContent = loading ? (
    <p className="text-center text-slate-200">Loading...</p>
  ) : error ? (
    <p className="text-center text-red-300">{error}</p>
  ) : weather ? (
    <LeftPanel weather={weather} hourlySlots={hourlySlots} units={units} />
  ) : null;

  const rightContent =
    !loading && !error && weather ? (
      <SevenDayForecast weather={weather} days={days} units={units} />
    ) : null;

  return (
    <Layout
      searchBar={searchBar}
      left={leftContent} // current + today
      right={rightContent} // 7-day forecast
      theme={{ mode: themeMode, gradientColors, solidColor }}
      onThemeModeChange={setThemeMode}
      onGradientChange={setGradientColors}
      onSolidColorChange={setSolidColor}
      units={units}
      onUnitsChange={setUnits}
      favorites={favorites}
      currentCity={city}
      onAddFavorite={handleAddFavorite}
      onSelectFavorite={handleSelectFavorite}
      onRemoveFavorite={handleRemoveFavorite}
    />
  );
}

export default App;
