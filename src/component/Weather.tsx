import React from 'react'
import { LocationProp, WeatherProp } from '../app/type';

type Props = {
    weatherData: WeatherProp,
    locationData: LocationProp,
};
const Weather: React.FC<Props> = (props) => {
    const { weatherData, locationData } = props;

    return (
        <div className='weather-box'>
            <div className='title'>Current Weather</div>
            <div className='weather-container'>
                <div className='container-col'>
                    <h2 className='place-title'>{locationData?.name}, {locationData?.country}</h2>
                    <h2 className='place-title'>{locationData?.lat}, {locationData?.lon}</h2>
                    <div className="place-temp">
                        <span>{weatherData?.temp_c}<sup>°c</sup></span>
                        <img src={`https:${weatherData?.condition?.icon}`} alt={weatherData?.condition?.text} style={{ height: "100px" }} />

                    </div>
                </div>
                <div className='container-col'>
                    <div className="weather-sub">Condition : {weatherData?.condition?.text}</div>
                    <div className="weather-sub"><div className='title'> Humidity</div><div className='info'>{weatherData?.humidity}</div></div>
                    <div className="weather-sub"><div className='title'> Temperature</div><div className='info'>{weatherData?.temp_c}<sup>°c</sup></div></div>
                    <div className="weather-sub"><div className='title'> Temperature</div><div className='info'>{weatherData?.temp_f}<sup>°f</sup></div></div>
                    <div className="weather-sub"><div className='title'> Wind</div><div className='info'>{weatherData?.wind_kph}</div></div>
                    <div className="weather-sub"><div className='title'> Wind Dir</div><div className='info'>{weatherData?.wind_dir}</div></div>
                    <div className="weather-sub"><div className='title'> Pressure</div><div className='info'>{weatherData?.pressure_mb}</div></div>
                </div>
                <div className='container-col'>
                    <div className="weather-sub">Air Quality : {weatherData?.air_quality?.o3}</div>
                    <div className="weather-sub"><div className='title'> Gust</div><div className='info'>{weatherData?.gust_kph}</div></div>
                    <div className="weather-sub"><div className='title'> Day</div><div className='info'>{weatherData?.is_day ? "Yes" : "No"}</div></div>
                    <div className="weather-sub"><div className='title'> Vis</div><div className='info'>{weatherData?.vis_km}<sup>°f</sup></div></div>
                </div>
            </div>
        </div>
    )
}

export default Weather