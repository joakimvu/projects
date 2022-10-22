import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Free weather API from https://openweathermap.org/current
  const [data, setData] = useState([]);
  const [city, setCity] = useState("Halden");
  const [cords, setCords] = useState("");

  const APIkey = "afcb135dee380f3782256ab20d8067b2";
  // const lat = "59.9139";
  // const lon = "10.7522";
  // let cityName = "Oslo";

  const cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cords?.lat}&lon=${cords?.lon}&appid=${APIkey}`;

  useEffect(() => {
    fetch(cityAPI)
      .then((response) => response.json())
      .then((data) => setCords(data[0]));
  }, [city]);

  // console.log(cords);

  // console.log(cords[0]?.lat);
  // console.log(cords[0]?.long);

  // Fetch weather from
  const getWeather = () => {};
  // useEffect(() => {
  //   const weather = fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);
  const temp = Math.round(data?.main?.temp - 273.15);

  // Saving input
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // Checking weather for given city
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{`Weather Forecast`}</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            value={city}
            placeholder="Search for a city"
          />
          {/* <ul id="programmingLanguages">
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </ul> */}
          <button type="submit">Search</button>
        </form>

        <p>{data?.name}</p>
        <p>{temp} Celcius</p>
      </header>
    </div>
  );
}

export default App;
