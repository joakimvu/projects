import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Free weather API from https://openweathermap.org/current
  const [data, setData] = useState([]);

  const APIkey = "afcb135dee380f3782256ab20d8067b2";
  const lat = "59.9139";
  const lon = "10.7522";
  const cityName = "Oslo";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

  useEffect(() => {
    const weather = fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // const name = data?.name;
  // const icon = data?.weather[0]?.icon;
  // const humidity = data?.main;
  // const speed = data?.wind;
  // let temp = data?.main;
  // temp = Math.round(temp - 273.15);

  const temp = Math.round(data?.main?.temp - 273.15);
  // const description = data?.weather[0]?.description;
  console.log(temp);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{`Weather in ${cityName}`}</h1>
        <p>{data?.name}</p>
        <p>{temp} Celcius</p>
      </header>
    </div>
  );
}

export default App;
