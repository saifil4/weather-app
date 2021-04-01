import React from 'react';
import { HourlyWeather } from '../interfaces/hourly-weather';

interface Props {
    data: Array<HourlyWeather> | undefined
}

const HourlyWeatherComponent: React.FC<Props> = ({ data }) => {

    return (
        <>
            {
                data ?
                    <div className="hourly-container">
                        {data.map((day) => (
                            <div className="hour-widget">
                                <p style={{ fontSize: "15px" }}>{day.Hour}</p>
                                <img alt={day.Description} width="50px" src={`http://openweathermap.org/img/wn/${day.Icon}@2x.png`} />
                                <h2>
                                    <span>{day.Temp}<sup>o </sup></span>
                                </h2>
                                <p className="description">{day.Description}</p>
                            </div>
                        ))}
                    </div>
                    :
                    <div>Loading</div>
            }
        </>
    );
}

export default HourlyWeatherComponent