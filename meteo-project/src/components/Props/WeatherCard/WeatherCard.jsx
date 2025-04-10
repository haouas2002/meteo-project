import React from 'react';
import './WeatherCard.css';
import location from "../../../assets/images/localisation.png";
import temp from "../../../assets/images/temp.png";

const WeatherCard = ({ weatherData, formattedDate, forecast }) => {
    return (
        <>
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
        </>
    );
};

export default WeatherCard;