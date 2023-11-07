export interface LocationProp {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface WeatherProp {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  air_quality: AirQuality
}

export interface Condition {
  text: string
  icon: string
  code: number
}

export interface AirQuality {
  co: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  "us-epa-index": number
  "gb-defra-index": number
}
export interface ForeCastShort {
  date?: string
  weatherIcon?: string
  weatherInfo?: string
  maxTemp?:number
  minTemp?:number
}


export interface FutureWeatherProp {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  condition: Condition
  uv: number
}





