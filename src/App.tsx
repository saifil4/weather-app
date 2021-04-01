import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DailyWeatherComponent from './components/daily-weather';
import CurrentWeatherComponent from './components/current-weather-component';
import HourlyWeatherComponent from './components/hourly-weather';
import Header from './components/header-component';
import { DailyWeather } from './interfaces/daily-weather';
import { CurrentWeather } from './interfaces/current-weather';
import { HourlyWeather } from './interfaces/hourly-weather';

const App: React.FC = () => {
  // const [city, SetCity] = useState('Toronto');
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeather>();
  const [dailyWeatherData, setDailyWeatherData] = useState<Array<DailyWeather>>();
  const [hourlyWeatherData, setHourlyWeatherData] = useState<Array<HourlyWeather>>();

  useEffect(() => {
    let url = '';
    navigator.geolocation.getCurrentPosition((position) => {
      url = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
      fetch(url)
        .then(data => data.json())
        .then(result => {
          console.log(result);
          setDailyWeatherData(mapDailyWeatherData(result.daily));
          setCurrentWeatherData(mapCurrentWeatherData(result.current));
          setHourlyWeatherData(mapHourlyWeatherData(result.hourly));
        });
    }, (err) => console.log(err));
  }, [])

  const mapDailyWeatherData = (data: Array<any>) => {
    return data.map(d => {
      let weatherdate = new Date(d.dt * 1000);
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let dailyweatherobj: DailyWeather = {
        MinTemp: Math.round(d.temp.min - 273.15),
        MaxTemp: Math.round(d.temp.max - 273.15),
        Icon: d.weather[0].icon,
        Day: days[weatherdate.getDay()],
        Description: d.weather[0].description
      };
      return dailyweatherobj;
    })
  }

  const mapCurrentWeatherData = (data: any) => {
    let obj: CurrentWeather = {
      Temp: Math.round(data.temp - 273.15),
      Icon: data.weather[0].icon,
      Date: new Date(data.dt * 1000).toDateString(),
      Description: data.weather[0].description,
      Sunrise: data.sunrise,
      Sunset: data.sunset,
      Wind: data.wind_speed,
      FeelsLike: Math.round(data.feels_like - 273.15),
      Humidity: data.humidity
    };
    return obj;
  }

  const mapHourlyWeatherData = (data: Array<any>) => {
    return data.map(d => {
      const hour = new Date(d.dt * 1000).getHours();
      let dailyweatherobj: HourlyWeather = {
        Temp: Math.round(d.temp - 273.15),
        Icon: d.weather[0].icon,
        Hour: hour > 12 ? (hour - 12) + ' PM' : hour + ' AM',
        Description: d.weather[0].description
      };
      return dailyweatherobj;
    })
  }

  return (
    <>
      <div className="app">
        <Header />
        <CurrentWeatherComponent data={currentWeatherData} />
        <HourlyWeatherComponent data={hourlyWeatherData} />
        <DailyWeatherComponent data={dailyWeatherData} />
      </div>
    </>
  );
}

export default App;
