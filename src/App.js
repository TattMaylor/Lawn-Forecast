import React, { useState, useEffect } from 'react';
import Forecast from './Forecast'
import './App.css';

function App() {

  const [dataObject, setData] = useState();

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=38.50&longitude=-81.50&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
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
      <Forecast data={dataObject} />
    </>
  );
}

export default App;
