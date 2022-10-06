import logo from "./logo.svg";
import "./App.css";
import useFetch from "../src/hooks/useFetch";

function App() {
  // Free open source weather api from https://open-meteo.com/en/docs

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=59.9138&longitude=10.7387&hourly=temperature_2m&past_days=3";

  const weatherData = useFetch(url);

  console.log(weatherData);

  return (
    <div className="App">
      <header className="App-header">
        {weatherData?.data?.hourly?.time?.map((hour) => (
          <p>{hour}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
