import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Free weather API from https://openweathermap.org/current
  const [data, setData] = useState([]);
  const [city, setCity] = useState("Oslo");
  // const [cords, setCords] = useState([]);
  const [lat, setLat] = useState("59.9133301");
  const [lon, setLon] = useState("10.7389701");
  const [cityList, setCityList] = useState([]);

  const APIkey = "afcb135dee380f3782256ab20d8067b2";

  const cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

  useEffect(() => {
    fetch(cityAPI)
      .then((response) => response.json())
      // .then((data) => setCords(data[0]));
      .then((data) => setCityList(data));
  }, [city]);
  const temp = Math.round(data?.main?.temp - 273.15);

  // Saving input
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // fetching weather data
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [lat, lon]);

  // const fetchingWeatherData = () => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // };

  // Checking weather for given city
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(lat, lon);
    // fetchingWeatherData();
  };

  // Handle chosen city from search suggestions
  const handleChosenCountry = async (e) => {
    e.preventDefault();
    const cord = e.target.value.split(",");
    setLat(cord[0]);
    setLon(cord[1]);
    // fetchingWeatherData();
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="content">
          <h1>{`Weather Forecast`}</h1>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              value={city}
              placeholder="Search for a city"
            />

            <button type="submit" className="submit-btn">
              Search
            </button>
          </form>

          {cityList && cityList.length >= 0 ? (
            <ul className="search-suggestions">
              {cityList?.map((city, index) => (
                <li key={index}>
                  <button
                    type="button"
                    value={[city?.lat, city?.lon]}
                    onClick={handleChosenCountry}
                  >
                    {city?.name} {city?.country}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p>{data?.name}</p>
          {temp ? <p>{temp} Celcius</p> : null}
        </div>
      </main>
    </div>
  );
}

export default App;
