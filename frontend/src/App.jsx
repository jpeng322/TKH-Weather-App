import { useEffect, useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import { getData } from "../api";
function App() {
  const [weatherData, setWeatherData] = useState();

  const [fiveDayData, setFiveDayData] = useState()


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WeatherApp />,
      loader: getData,
    },
  ]);

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
      console.log(dataArray);
    }

    setFiveDayData(arrayOfDaysData);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `https://api.openweathermap.org/data/2.5/forecast?lat=40.71&lon=-74.00&&appid=${
            import.meta.env.VITE_WEATHER_KEY
          }`,
        });

        if (response) {
          const data = response.data;
          console.log(data);
          setWeatherData(data);
          createData()
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();


    
  }, []);

  // const createData = () => {
  //   const arrayOfDaysData = [];
  //   let counter = 0;
  //   let dataArray = [];
  //   while (counter < weatherData.list.length) {
  //     if (weatherData.list[counter].dt_txt.split(" ")[1] === "00:00:00") {
  //       arrayOfDaysData.push(dataArray);
  //       dataArray = [];
  //     }
  //     dataArray.push(weatherData.list[counter]);
  //       counter++;
  //     console.log(dataArray);
  //   }

  //   return arrayOfDaysData;
  // };

  // console.log(createData());
  return (
    <RouterProvider router={router} />
   
  );
}

export default App;
