import React, { useState, useEffect } from 'react';
import Forecast from './Forecast'
import './App.css';

function App() {

  const [dataObject, setData] = useState();

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&forecast_days=14&timezone=America%2FNew_York`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <h1>Lawn Forecast</h1>
      <Forecast data={dataObject} />
    </>
  );
}

export default App;
