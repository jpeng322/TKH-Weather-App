import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import { getTodoData, getWeatherData } from "../api";
import TodoApp from "./TodoApp";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WeatherApp />,
      loader: getWeatherData,
      children: [
        {
          path: "/",
          element: <TodoApp />,
          loader: getTodoData,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
