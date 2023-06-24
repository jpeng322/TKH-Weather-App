import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const WeatherApp = () => {
  const loaderWeatherData = useLoaderData();

  const [weatherData, setWeatherData] = useState(loaderWeatherData);

  const [fiveDayData, setFiveDayData] = useState();

  console.log(weatherData);

  const KelvinToFah = (temp) => {
    const fah = Math.ceil(((temp - 273.15) * 9) / 5 + 32);

    return fah;
  };

  const UtcToUsa = (time) => {
    // var utcTime = new Date("2023-06-24 03:00:00");
    const utcTime = new Date(time);
    let usaTime = utcTime.toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    // console.log(usaTime.split(" ")[1].replace(/[0:]/g, ''))
    usaTime =
      usaTime.split(" ")[0] +
      " " +
      usaTime.split(" ")[1].replace(/[0:]/g, "") +
      " " +
      usaTime.split(" ")[2];

    // console.log(date, noZeros, usaTime.split(" ")[2])
    // usaTime = usaTime.replace(/[0:]/g, '');
    // const newUsa= usaTime.replaceAll("0", " ").replaceAll(":"," ")
    return usaTime;
  };

  const createData = async () => {
    const arrayOfDaysData = [];
    let counter = 0;
    let dataArray = [];

    while (counter < weatherData.list.length) {
      if (weatherData.list[counter].dt_txt.split(" ")[1] === "00:00:00") {
        arrayOfDaysData.push(dataArray);
        dataArray = [];
      }
      dataArray.push(weatherData.list[counter]);
      counter++;
    }

    console.log(arrayOfDaysData);
  };

  createData();

  return (
    <>
      {weatherData && (
        <div className="weather-container">
          <div>{weatherData.city.name}</div>

          <div className="weather-cards-container">
            {weatherData.list.map((day, index) => {
              return (
                <div key={index} className="weather-card">
                  <div className="weather-temp">
                    {KelvinToFah(day.main.temp)} °F
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="weather_icon"
                  />
                  <div className="weather-description">
                    {day.weather[0].description}
                  </div>
                  <div>{UtcToUsa(day.dt_txt)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherApp;
