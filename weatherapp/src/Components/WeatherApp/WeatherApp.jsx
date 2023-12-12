import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'


export default function WeatherApp() {

  const api_key = "9f3c5eb2b96904285ac88121c2fa8cca";

  const [wicon,setWicon] = useState(cloud_icon);

  const search = async() => {
    const element = document.querySelector(".cityInput");
    if (element.value ==="") {
      return 0;
    }

    let url =`https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.querySelector(".humidity-percent");
    const wind = document.querySelector(".wind-rate");
    const temperature = document.querySelector(".weather-temp");
    const location = document.querySelector(".weather-location");

    humidity.textContent = data.main.humidity + '%';
    wind.textContent = data.wind.speed + ' km/h';
    temperature.textContent = Math.floor(data.main.temp *10)/10 + '°C';
    location.textContent = data.name;

    if(data.weather[0].icon==="01d" || data.weather[0].icon ==="01n") {
      setWicon(clear_icon);
    }
    if(data.weather[0].icon==="02d" || data.weather[0].icon ==="02n" || data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n" || data.weather[0].icon === "04d" || data.weather[0].icon ==="04n") {
      setWicon(cloud_icon);
    }

    if(data.weather[0].icon==="09d" || data.weather[0].icon ==="09n") {
      setWicon(drizzle_icon);
    }

    if(data.weather[0].icon==="10d" || data.weather[0].icon ==="10n" || data.weather[0].icon==="11d" || data.weather[0].icon=== "11n") {
      setWicon(rain_icon);
    }

    if(data.weather[0].icon==="13d" || data.weather[0].icon ==="13n") {
      setWicon(snow_icon);
    }
  }



  return (
    <div className = 'container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="magnifying glass icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        --°C
      </div>
      <div className="weather-location">---</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              --%
            </div>
            <div className="text">
              Humdity
            </div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              -- km/h
            </div>
            <div className="text">
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
