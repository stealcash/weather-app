import React from 'react'
import { ForeCastShort } from '../app/type';

type Props = {
    data: ForeCastShort[],
    days: number,
};
const ForeCastWeather: React.FC<Props> = (props) => {
    const { data, days } = props;
    return (
        <>
            <div className='forecast-title'>Next {days} Days</div>
            <div className='weather-box'>
                <div className='forcast-container'>
                    {data.map((item, i) => {
                        return (
                            <div className="forcast-col" key={i}>
                                <div className="date">{item?.date}</div>
                                <div>{item?.minTemp} <sup>&deg;C</sup> <span style={{ margin: "0 10px" }}>|</span><span>{item?.maxTemp} <sup>&deg;C</sup></span></div>
                                <div style={{marginTop:"10px"}}>{item?.weatherInfo}</div>
                                <div><img src={item?.weatherIcon} alt={item?.weatherInfo} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default ForeCastWeather