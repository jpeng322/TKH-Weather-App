import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const WeatherApp = () => {
  const loaderWeatherData = useLoaderData();

  const [weatherData, setWeatherData] = useState(loaderWeatherData);

  const [fiveDayData, setFiveDayData] = useState();
  const [toggleDaily, setToggleDaily] = useState();

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
      //   usaTime.split(" ")[0] +
      //   " " +
      usaTime.split(" ")[1].replace(/[0:]/g, "") + " " + usaTime.split(" ")[2];

    // console.log(date, noZeros, usaTime.split(" ")[2])
    // usaTime = usaTime.replace(/[0:]/g, '');
    // const newUsa= usaTime.replaceAll("0", " ").replaceAll(":"," ")
    return usaTime;
  };

  const date = new Date("2023-06-24 03:00:00");
  let usaTime = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  function UtcToDay(time) {
    const date = new Date(time);
    const typeOfDay = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return typeOfDay;
  }

  useEffect(() => {
    const createData = () => {
      const arrayOfDaysData = [];
      let counter = 0;
      let dataArray = [];

      while (counter < weatherData.list.length) {
        if (weatherData.list[counter].dt_txt.split(" ")[1] === "00:00:00") {
          arrayOfDaysData.push({
            date: weatherData.list[counter - 1].dt_txt,
            dataArray,
          });
          dataArray = [];
        }
        dataArray.push(weatherData.list[counter]);
        counter++;
        // console.log(counter)
      }
      console.log(arrayOfDaysData);

      setFiveDayData(arrayOfDaysData);
    };

    createData();
  }, []);

  console.log(fiveDayData);

  //   const startingPrice = fiveDayData[0].dataArray.reduce(function (prev, curr) {
  //     return prev.main.temp_max < curr.main.temp_min ? prev.main.temp_max : curr.main.temp_min;
  //   });

  //   console.log(
  //     fiveDayData[0].dataArray.reduce(function (prev, curr) {
  //       return prev.main.temp_max < curr.main.temp_min ? prev : curr;
  //     })
  //   );

  const getHighOrLowTemp = (dataArray, type = "high") => {
    const tempObj = dataArray.dataArray.reduce(function (prev, curr) {
      if (type === "low") {
        return prev.main.temp_max < curr.main.temp_min ? prev : curr;
      } else if (type === "high") {
        return prev.main.temp_max > curr.main.temp_min ? prev : curr;
      } else {
        return null;
      }
    });

    const temp = KelvinToFah(tempObj.main.temp_max);
    return temp;
  };

  // console.log(starting)
  return (
    <>
      <div className="weather-container">
        <header>
          <h1>{weatherData.city.name} 5-Day Forecast</h1>
          <div className="button-container">
            <button
              className={toggleDaily ? "active" : ""}
              onClick={() => setToggleDaily(true)}
            >
              Daily
            </button>
            <button
              className={toggleDaily ? "" : "active"}
              onClick={() => setToggleDaily(false)}
            >
              3 Hours
            </button>
          </div>
        </header>
        {/* <div className="weather-cards-container">
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
          </div> */}
        {toggleDaily
          ? fiveDayData && (
              <div className="weather-daily-cards-container">
                {fiveDayData.map((dayArray) => {
                  return (
                    <div className="weather-daily">
                      <h3> {UtcToDay(dayArray.date)} </h3>
                      <div className="weather-daily-info">
                        <div className="weather-card">
                          <div className="weather-temp">
                            {KelvinToFah(dayArray.dataArray[3].main.temp)} °F
                          </div>
                          <div className="weather-daily-high-low">
                            <div>
                              High: {getHighOrLowTemp(dayArray, "high")}
                            </div>
                            <div>Low: {getHighOrLowTemp(dayArray, "low")}</div>
                          </div>
                          <img
                            src={`https://openweathermap.org/img/wn/${dayArray.dataArray[0].weather[0].icon}@2x.png`}
                            alt="weather_icon"
                          />
                          <div className="weather-description">
                            {dayArray.dataArray[3].weather[0].description}
                          </div>
                          <div>{UtcToUsa(dayArray.dataArray[3].dt_txt)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          : fiveDayData && (
              <div className="weather-cards-container">
                {fiveDayData.map((dayArray) => {
                  return (
                    <div className="weather-day">
                      <h3> {UtcToDay(dayArray.date)} </h3>
                      <div className="weather-day-info">
                        {dayArray.dataArray.map((day, index) => {
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
                  );
                })}
              </div>
            )}
      </div>
    </>
  );
};

export default WeatherApp;
