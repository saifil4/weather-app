import React from 'react';

import { DailyWeather } from '../interfaces/daily-weather'

interface Props {
    data: Array<DailyWeather> | undefined
}

const DailyWeatherComponent: React.FC<Props> = ({ data }) => {
    return (
        <>
            {
                data ?
                    <div className="weekly-container">
                        <table style={{ color: 'white' }}>
                            <tbody>
                                {data.map((day) => (
                                    <tr>
                                        <td>
                                            {day.Day}
                                        </td>
                                        <td>
                                            <img alt={day.Description} width="50px" src={`http://openweathermap.org/img/wn/${day.Icon}@2x.png`} />
                                            <span>{day.Description}</span>
                                        </td>
                                        <td>
                                            <span>{day.MinTemp}<sup>o </sup></span>
                                            <span>{day.MaxTemp}<sup>o</sup></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>Loading</div>
            }
        </>
    )
}

export default DailyWeatherComponent;