import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [dataObject, setData] = useState();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((x) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x.coords.latitude}&longitude=${x.coords.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setData(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  }, []);

  return (
    <div>
      <h1>Daily Maximum Temperatures</h1>
      {dataObject && dataObject.daily && dataObject.daily.temperature_2m_max && (
        <>
            {dataObject.daily.time.map((day, index) => (
              <div key={day}>
                  <p>
                    {day}: {dataObject.daily.temperature_2m_max[index]}°F
                  </p>
                </div>
            ))}
        </>
      )}
    </div>
  );
}

export default App;
