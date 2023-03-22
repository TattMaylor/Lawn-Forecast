import React, { useState } from 'react';
import Forecast from './Forecast'
import './App.css';

function App() {

  const [dataObject, setData] = useState();

  async function fetchData() {
    let zipcode = document.getElementById('zipcode').value;
    let latitude = 0;
    let longitude = 0;

    const coordResponse = await fetch(`http://api.geonames.org/postalCodeSearch?postalcode=${zipcode}&country=US&username=lawnforecast`);
    const coordData = await coordResponse.text();
    const parsedData = new window.DOMParser().parseFromString(coordData, "text/xml");
    latitude = parsedData.getElementsByTagName("lat")[0].textContent;
    longitude = parsedData.getElementsByTagName("lng")[0].textContent;
    console.log(latitude);
    console.log(longitude);

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&forecast_days=10&timezone=America%2FNew_York`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    setData(weatherData);
  }

  return (
    <>
      <input id='zipcode'></input>
      <button onClick={() => { fetchData() }}>Fetch Data</button>
      <Forecast data={dataObject} />
    </>
  );
}

export default App;
