import { useEffect, useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import { getData } from "../api";
function App() {


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WeatherApp />,
      loader: getData,
    },
  ]);



  return (
    <RouterProvider router={router} />
   
  );
}

export default App;
