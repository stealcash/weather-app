import React from 'react'
import { LocationProp, FutureWeatherProp } from '../app/type';

type Props = {
    weatherData: FutureWeatherProp,
    locationData: LocationProp,
    date: string,
};
const FutureWeather: React.FC<Props> = (props) => {
    const { weatherData, locationData, date } = props;

    return (
        <div className='weather-box'>
            <div className='title'>{`Weather on ${date}`}</div>
            <div className='weather-container'>
                <div className='container-col'>
                    <h2 className='place-title'>{locationData?.name}, {locationData?.country}</h2>
                    <h2 className='place-title'>{locationData?.lat}, {locationData?.lon}</h2>
                    <div className="place-temp">
                        <span>{weatherData?.avgtemp_c}<sup>°c</sup></span>
                        <img src={`https:${weatherData?.condition?.icon}`} alt={weatherData?.condition?.text} style={{ height: "100px" }} />

                    </div>
                </div>
                <div className='container-col'>
                    <div className="weather-sub">Condition : {weatherData?.condition?.text}</div>
                    <div className="weather-sub"><div className='title'> Humidity</div><div className='info'>{weatherData?.avghumidity}</div></div>
                    <div className="weather-sub"><div className='title'> Min Temp</div><div className='info'>{weatherData?.mintemp_c}<sup>°c</sup></div></div>
                    <div className="weather-sub"><div className='title'> Max Temp</div><div className='info'>{weatherData?.maxtemp_c}<sup>°f</sup></div></div>
                    <div className="weather-sub"><div className='title'> Max Wind</div><div className='info'>{weatherData?.maxwind_kph}</div></div>
                </div>
                <div className='container-col'>
                    <div className="weather-sub"><div className='title'> Uv</div><div className='info'>{weatherData?.uv}</div></div>
                    <div className="weather-sub"><div className='title'> Vis</div><div className='info'>{weatherData?.avgvis_km}</div></div>
                </div>
            </div>
        </div>
    )
}

export default FutureWeather