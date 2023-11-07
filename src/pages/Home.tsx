import React, { useEffect, useState } from 'react'
import DebounceInput from '../component/DebounceInput'
import { fetchCurrentWeather, fetchForeCastData, fetchFutureWeather } from '../api/weatherAPI'
import { ForeCastShort, FutureWeatherProp, LocationProp, WeatherProp } from '../app/type'
import Weather from '../component/Weather'
import ForeCastWeather from '../component/ForeCastWeather'
import moment from 'moment'
import FutureWeather from '../component/FutureWeather'

const Home = () => {
  const d = new Date();
  const FORCAST_DAYS = 10
  const minDate = moment(d).add(14, 'd').format('YYYY-MM-DD');
  const [search, setSearch] = useState('')
  const [locationData, setLocationData] = useState<LocationProp>();
  const [weatherData, setWeatherData] = useState<WeatherProp>();
  const [futureWeatherData, setFutureWeatherData] = useState<FutureWeatherProp>();
  const [foreCastData, setForeCastData] = useState<ForeCastShort[]>([]);
  const [useCordinate, setUseCordinate] = useState(true)
  const [useSelectedDate, setUseSelectedDate] = useState(false)
  const [selecteDate, setSelectedDate] = useState(minDate)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [cordinateLoaded, setCordinatedLoaded] = useState(false)


  const getForecastData = async (searchInput: string, useCordinate: boolean, lat: number, long: number) => {
    //pass days and search input to get the data
    try {
      const result = await fetchForeCastData({ search: searchInput, useCordinate: useCordinate, lat: lat, long: long, days: FORCAST_DAYS });
      if (result?.forecast?.forecastday && result?.forecast?.forecastday.length > 0) {
        const data: ForeCastShort[] = []
        result.forecast.forecastday.forEach((item: any) => {
          // we will save only minimum info from api response
          const temp: ForeCastShort = {}
          temp["date"] = item?.date
          temp["weatherIcon"] = item?.day?.condition?.icon ? `https:${item.day.condition.icon}` : ""
          temp["weatherInfo"] = item?.day?.condition?.text
          temp["maxTemp"] = item?.day?.maxtemp_c
          temp["minTemp"] = item?.day?.mintemp_c
          data.push(temp)
        })
        setForeCastData(data)

      }
    } catch (err) {
      console.error('Error in getting Weather Data: ', err);
      return
    }
  };
  const setCurrentPosition = () => {
    //  set lat and long from current location 
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setCordinatedLoaded(true)
      });
    }
  }

  const getFutureWeatherData = async (dt: string) => {
    //get Future data , dt should be within 14 form current date and between next 100 
    try {
      const result = await fetchFutureWeather({ search: search, useCordinate: useCordinate, lat: lat, long: long, dt });
      if (result?.location) { setLocationData(result.location); }
      if (result?.forecast?.forecastday?.[0]?.day) { setFutureWeatherData({ ...result?.forecast?.forecastday?.[0]?.day }); }
      setSuccess(true)
    } catch (err) {
      setError("error")
      console.error('Error in getting Weather Data: ', err);
    }
  };



  useEffect(() => {
    const getWeatherData = async (searchbyCordinate: boolean, searchInput: string, lat: number, long: number) => {
      //get weather date based on search location , if usecordinate is true lat and long will be used
      try {
        const result = await fetchCurrentWeather({ search: searchInput, useCordinate: searchbyCordinate, lat: lat, long: long });
        if (result?.location) { setLocationData(result.location); }
        if (result?.current) { setWeatherData(result.current); }
        setSuccess(true)
        getForecastData(searchInput, searchbyCordinate, lat, long)
      } catch (err) {
        setError("error")
        console.error('Error in getting Weather Data: ', err);
      }
    };
    if (search?.length > 0 && !useCordinate) {
      getWeatherData(false, search, 0, 0);
    } else if (useCordinate && lat > 0 && long > 0) {
      getWeatherData(true, '', lat, long);
    }
  }, [search, useCordinate, lat, long]);

  useEffect(() => {
    setCurrentPosition()
  },
    []);
  return (
    <div>
      <div className='search-box'>
        <div className='search-item' style={{ width: "auto" }}>
          <div className='type-selector'>
            <div className='search-item'>
              <label>Type Of Search</label>
              <select value={useCordinate ? "2" : "1"} onChange={(e) => {
                if (e.target.value === "1") { setUseCordinate(false) }
                else setUseCordinate(true)
              }}>
                <option value="1" >Location</option>
                <option value="2" >Cordinates</option>
              </select>
            </div>
            <div className='search-item'>
              <label>Search Time</label>
              <select value={useSelectedDate ? "2" : "1"} onChange={(e) => {
                if (e.target.value === "1") {
                  setUseSelectedDate(false)
                }
                else {
                  setUseSelectedDate(true); getFutureWeatherData(selecteDate)
                }
              }}>
                <option value="1" >Current time</option>
                <option value="2" >Other Days</option>
              </select>
            </div>
          </div>

        </div>
        {useSelectedDate &&
          <div className='search-item'>
            <label>Select Date</label>
            <input type='date'
              placeholder=""
              style={{ width: "100px" }}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                getFutureWeatherData(e.target.value)

              }}
              value={selecteDate}
              min={minDate} max="2023-12-31"
            />
          </div>
        }
        {(useCordinate && cordinateLoaded) ?
          <div className='search-item' style={{ width: "auto" }}>
            <label>Select Cordinates</label>
            <div className='search-items-cordniates'>
              <DebounceInput search={lat} setSearch={setLat}
                timeout={1000}
                type="number"
                placeholder="Enter latitude"
                style={{ width: "120px", paddingRight: 0 }}
                value={lat}
              />
              <DebounceInput search={long} setSearch={setLong}
                timeout={1000}
                type="number"
                placeholder="Enter longitude"
                style={{ width: "120px", margin: "0 10px", paddingRight: 0 }}

              />
              <div className='detact-button' onClick={setCurrentPosition}>Detact</div>
            </div>
          </div>
          :
          <div className='search-item'>
            <label>Search Location</label>
            <DebounceInput search={search} setSearch={setSearch}
              timeout={1000}
              placeholder="Enter City or location"
              style={{ width: "200px" }}
            />
            {error?.length > 0 ? <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span> :
              success ? <span style={{ color: "green", fontSize: "0.8rem" }}>Success!</span> : null
            }
            <span></span>
          </div>
        }
      </div>

      {weatherData && locationData && !useSelectedDate &&
        <Weather
          weatherData={weatherData}
          locationData={locationData}
        />
      }
      {futureWeatherData && locationData && useSelectedDate &&
        <FutureWeather
          weatherData={futureWeatherData}
          locationData={locationData}
          date={selecteDate}
        />
      }
      {foreCastData?.length > 0 &&
        <ForeCastWeather
          data={foreCastData}
          days={FORCAST_DAYS} />
      }

    </div >
  )
}

export default Home