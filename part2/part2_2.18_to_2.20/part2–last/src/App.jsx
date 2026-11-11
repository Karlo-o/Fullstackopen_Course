import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Weather from "./Weather.jsx";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [clickedCountry, setClickedCountry] = useState(null);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(response.data[0]);
        setCountries(response.data);
      });
  }, []);

  const handleCountryChange = (event) => {
    setSearch(event.target.value);
    setClickedCountry(null);
  };

  const matches = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const renderResults = () => {
    if (matches.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    const showCountry = (country) => {
      return (
        <div>
          <h1>{country.name.common}</h1>
          <div>Capital {country.capital}</div>
          <div>Area {country.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages ?? {}).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            width="200"
          />
          <Weather
            key={country.cca3}
            capital={country.capital?.[0]}
            latlng={country.capitalInfo?.latlng}
          />
        </div>
      );
    };

    if (clickedCountry) {
      return showCountry(clickedCountry);
    }

    if (matches.length > 1) {
      return matches.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setClickedCountry(country)}>Show</button>
        </div>
      ));
    }

    if (matches.length === 1) {
      const country = matches[0];
      return showCountry(country);
    }

    return null;
  };

  return (
    <div>
      <div>
        <p>find countries</p>
        <input type="search" value={search} onChange={handleCountryChange} />
      </div>
      <div>{renderResults()}</div>
    </div>
  );
};

export default App;
