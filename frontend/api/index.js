import axios from "axios";

export const getWeatherData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=40.71&lon=-74.00&&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }`,
    });

    if (response) {
      const data = response.data;
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getTodoData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND}/todo`,
    });

    if (response) {
      const listOfTodos = response.data.listOfTodos;

      return listOfTodos;
    }
  } catch (e) {
    console.log(e);
  }
};
