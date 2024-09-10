"use client";
import axios from "axios";
import React, { useContext, createContext, useEffect } from "react";
import { useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data", error.message);
    }
  };

  // Air Quality
  const fetchAirQuality = async () => {
    try {
      const res = await axios.get("api/pollution");

      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data:", error.message);
    }
  };

  // Five Day Forecast
  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get("api/fiveday");
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
