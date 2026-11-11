import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!capital || !api_key) return;

    const params = latlng
      ? { lat: latlng[0], lon: latlng[1] }
      : { q: capital };

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: { ...params, appid: api_key, units: "metric" },
      })
      .then((response) => setWeather(response.data))
      .catch(() => setError(`Could not fetch weather for ${capital}`));
  }, [capital, latlng]);

  if (!capital) return null;
  if (!api_key) return <p>No weather API key set (VITE_API_KEY)</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  const icon = weather.weather[0];

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon.icon}@2x.png`}
        alt={icon.description}
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
