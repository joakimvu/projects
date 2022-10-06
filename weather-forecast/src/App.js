import "./App.css";
import useFetch from "../src/hooks/useFetch";

function App() {
  // Free open source weather api from https://open-meteo.com/en/docs

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=59.9138&longitude=10.7387&hourly=temperature_2m&past_days=3";

  const weatherData = useFetch(url);

  const times = [weatherData?.data?.hourly?.time];
  const temps = [weatherData?.data?.hourly?.temperature_2m];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather forecast for Oslo</h1>
        {times && <span>{times[0][0]}</span>}
        {times && <span>{temps[0][0]}</span>}
      </header>
    </div>
  );
}

export default App;
