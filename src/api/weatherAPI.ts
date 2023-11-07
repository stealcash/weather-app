import axios from 'axios';
import { BASE_URL, KEY } from '../app/constants';
import { handleErrorWithCode } from './responseHandler';

type weatherProps = {
    search?: string,
    lat?: number;
    long?: number,
    useCordinate?: boolean,
    [rest: string]: any;
};

type forcastProps = weatherProps & {
    days:number,
    [rest: string]: any;
};

type futureWeatherProps = weatherProps & {
    dt:string,
    [rest: string]: any;
};


// fetch current weather data based on location or lat ,long serach
export async function fetchCurrentWeather(props: weatherProps) {
    const url = `${BASE_URL}/current.json`;
    try {
        const result = await axios.get(url, {
            params: {
                key: KEY,
                aqi: "yes",
                ...(!props?.useCordinate && { q: props?.search ?? "" }),
                ...(props?.useCordinate && { q: `${props?.lat},${props?.long}` ?? "" }),
            }
        });
        if (Number(result.status) !== 200) {
            throw (result.statusText);
        }
        return result.data
    } catch (err) {
        throw handleErrorWithCode(err);
    }
}


// fetch forecase weather data based on location or lat ,long serach and days 

export async function fetchForeCastData(props: forcastProps) {
    const url = `${BASE_URL}/forecast.json`;
    try {
        const result = await axios.get(url, {
            params: {
                key: KEY, aqi: "no", alert: "no",days:props.days,
                ...(!props?.useCordinate && { q: props?.search ?? "" }),
                ...(props?.useCordinate && { q: `${props?.lat},${props?.long}` ?? "" }),
            }
        });
        if (Number(result.status) !== 200) {
            throw (result.statusText);
        }
        return result.data
    } catch (err) {
        throw handleErrorWithCode(err);
    }
}

// fetch upcoming weather data based on location or lat ,long and date search
export async function fetchFutureWeather(props: futureWeatherProps) {
    const url = `${BASE_URL}/future.json`;
    try {
        const result = await axios.get(url, {
            params: {
                key: KEY,
                aqi: "yes",
                dt:props.dt,
                ...(!props?.useCordinate && { q: props?.search ?? "" }),
                ...(props?.useCordinate && { q: `${props?.lat},${props?.long}` ?? "" }),
            }
        });
        if (Number(result.status) !== 200) {
            throw (result.statusText);
        }
        return result.data
    } catch (err) {
        throw handleErrorWithCode(err);
    }
}



