import React, {useRef, useState} from "react";
import './Home.css'
import WeatherCard from "../Props/WeatherCard/WeatherCard.jsx";
import Heading from "../Heading.jsx";
import Footer from "../Footer.jsx";
import clear_sky from "../../assets/images/clearSky.png";
import few_clouds from "../../assets/images/fewClouds.png";
import scattered_clouds from "../../assets/images/scatteredClouds.png";
import broken_clouds from "../../assets/images/brokenClouds.png";
import shower_rain from "../../assets/images/showerRain.png";
import rain from "../../assets/images/rain.png";
import thunderstorm from "../../assets/images/thunderstorm.png";
import snow from "../../assets/images/snow.png";
import mist from "../../assets/images/mist.png";
import Search from "../../assets/images/Search.png";

const Home = () => {
    const apiKey = import.meta.env.VITE_WEATHER_ID;
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

    const today = new Date();
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toLocaleDateString("en-US", options);



    return(
        <>
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
            <Heading />
            <WeatherCard weatherData={weatherData} formattedDate={formattedDate} forecast={forecast} />

            <Footer />
        </>

    );
};
export default Home;