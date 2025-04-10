import { useState, useRef ,useEffect  } from "react";
import clear_sky from "../assets/images/clearSky.png";
import few_clouds from "../assets/images/fewClouds.png";
import scattered_clouds from "../assets/images/scatteredClouds.png";
import broken_clouds from "../assets/images/brokenClouds.png";
import shower_rain from "../assets/images/showerRain.png";
import rain from "../assets/images/rain.png";
import thunderstorm from "../assets/images/thunderstorm.png";
import snow from "../assets/images/snow.png";
import mist from "../assets/images/mist.png";
import Search from "../assets/images/Search.png";
import temp from "../assets/images/temp.png";
import location from "../assets/images/localisation.png";
import "../styles/Weather.css";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const weatherIcons = {
    "01d": clear_sky,
    "01n": clear_sky,
    "02d": few_clouds,
    "02n": few_clouds,
    "03d": scattered_clouds,
    "03n": scattered_clouds,
    "04d": broken_clouds,
    "04n": broken_clouds,
    "09d": shower_rain,
    "09n": shower_rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = weatherIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        visibility: data.visibility,
        location: data.name,
        icon: icon,
      });
      searchForecast(city);
    } catch (error) {
      setWeatherData(false);
      console.error(error.message);
    }
  };

  const searchForecast = async (city) => {
    if (!city) {
      alert("Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const forecastData = {};
      for (let i = 0; i < 39; i++) {
        forecastData[`time${i}`] = new Date(data.list[i].dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
        forecastData[`temperature${i}`] = Math.floor(data.list[i].main.temp);
        forecastData[`humidity${i}`] = data.list[i].main.humidity;
        forecastData[`visibility${i}`] = data.list[i].visibility;
        forecastData[`windSpeed${i}`] = data.list[i].wind.speed;
        forecastData[`icon${i}`] = weatherIcons[data.list[i].weather[0].icon];
      }
      setForecast(forecastData);
    } catch (error) {
      setForecast(null);
      setError("Erreur de récupération des données météo");
      console.error(error.message);
    }
  };
  useEffect(() => {
    search("tunisia");
  }, []);
  

  const today = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); 
  const formattedTomorrow = tomorrow.toLocaleDateString("en-US", options);

  return (
    <div className="weather-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search location..." 
          ref={inputRef} 
          className="search-input" 
        />
        <img 
          src={Search} 
          onClick={() => search(inputRef.current.value)} 
          className="search-icon" 
          alt="Search"
        />
      </div>
      
      <div id="current-weather">
        {weatherData && (
          <>
            <div className="location-container">
              <p className="location-name">{weatherData.location}</p>
              <img src={location} className="location-icon" alt="Location" />
            </div>
            <div className="weather-main">
              <div className="temperature-container">
                <img src={temp} alt="Temperature" className="temperature-icon" />
                <p className="temperature-value">{weatherData.temperature}°C</p>
                <img src={weatherData.icon} alt="Weather" className="weather-icon-large" />
              </div>
              <p className="current-date">{formattedDate}</p>
            </div>
            <div className="weather-details">
              <div className="weather-detail">
                <p className="detail-label">HUMIDITY</p>
                <p className="detail-value">{weatherData.humidity}%</p>
              </div>
              <div className="weather-detail">
                <p className="detail-label">WIND SPEED</p>
                <p className="detail-value">{weatherData.windSpeed}mph</p>
              </div>
              <div className="weather-detail">
                <p className="detail-label">VISIBILITY</p>
                <p className="detail-value">{weatherData.visibility}</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div>
        {forecast && (
          <div className="hourly-forecast">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div className="forecast-item" key={i}>
                <p className="forecast-time">{forecast[`time${i}`]}</p>
                <img src={forecast[`icon${i}`]} alt="Weather" className="forecast-icon" />
                <p className="forecast-temp">{forecast[`temperature${i}`]}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div id="tomorrow-weather">
        {forecast && (
          <>
            <div className="location-container">
              <p className="location-name">{weatherData.location}</p>
              <img src={location} className="location-icon" alt="Location" />
            </div>
            <div className="weather-main">
              <div className="temperature-container">
                <img src={temp} alt="Temperature" className="temperature-icon" />
                <p className="temperature-value">{forecast[`temperature${13}`]}°C</p>
                <img src={weatherData.icon} alt="Weather" className="weather-icon-large" />
              </div>
              <p className="current-date">{formattedTomorrow}</p>
            </div>
            <div className="weather-details">
              <div className="weather-detail">
                <p className="detail-label">HUMIDITY</p>
                <p className="detail-value">{forecast[`humidity${13}`]}%</p>
              </div>
              <div className="weather-detail">
                <p className="detail-label">WIND SPEED</p>
                <p className="detail-value">{forecast[`windSpeed${13}`]}mph</p>
              </div>
              <div className="weather-detail">
                <p className="detail-label">VISIBILITY</p>
                <p className="detail-value">{forecast[`visibility${13}`]}</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div>
        {forecast && (
          <div className="hourly-forecast">
            {[13, 14, 15, 16, 17, 18, 19].map((i) => (
              <div className="forecast-item" key={i}>
                <p className="forecast-time">{forecast[`time${i}`]}</p>
                <img src={forecast[`icon${i}`]} alt="Weather" className="forecast-icon" />
                <p className="forecast-temp">{forecast[`temperature${i}`]}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;