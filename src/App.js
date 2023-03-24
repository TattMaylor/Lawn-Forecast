import React, { useState } from 'react';
import Forecast from './Forecast'
import zipcodes from './assets/zipcodes.json';
import './App.css';

function App() {

  const [weatherDataObject, setWeatherData] = useState();
  const [locationDataObject, setLocationData] = useState({ city: '', state: '' });

  async function fetchData() {
    let input_zipcode = Number(document.getElementById('zipcode').value);
    let latitude, longitude = 0;

    for (let i = 0; i < zipcodes.length; i++) {
      if (zipcodes[i].zipcode === input_zipcode) {
        latitude = zipcodes[i].latitude;
        longitude = zipcodes[i].longitude;
        setLocationData({ city: zipcodes[i].city, state: zipcodes[i].state });
      }
    }

    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&forecast_days=10&timezone=America%2FNew_York`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else {
          alert('Unable to fetch data for the provided zipcode. Please double check your input.');
        }
      }).then((json) => {
        setWeatherData(json);
      })
  }

  return (
    <>
      <div>
        <p>Displaying data for: {`${locationDataObject.city}, ${locationDataObject.state}`}</p>
        <input id='zipcode' placeholder='Input Zipcode'></input>
        <button onClick={() => { fetchData() }}>Fetch Data</button>
      </div>
      <Forecast data={weatherDataObject} />
    </>
  );
}

export default App;
