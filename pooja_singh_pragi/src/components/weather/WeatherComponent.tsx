"use client";
import { useAppDispatch } from "@/hooks/dispatchHook";
import { fetchCities } from "@/services/api";
import { fetchForecast, fetchWeather } from "@/store/weatherReducer";
import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Recharts components

interface City {
  city: string;
  latitude: number | string;
  longitude: number | string;
  country: string;
}

const OpenWeatherComponents = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [data, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const results = await fetchCities(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleCityClick = async (city: City) => {
    setQuery(`${city.city}, ${city.country}`);
    setSuggestions([]);
    try {
      const weatherData = await dispatch(fetchWeather(city.city));
      setWeather(weatherData.payload);
      const forecastData: any = await dispatch(fetchForecast(city.city));
      setForecast(forecastData.payload);
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching the data.");
    }
  };

  const debounce = (func: any, delay: number) => {
    let timeout: any;
    return function (args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(args);
      }, delay);
    };
  };

  const deb = debounce(handleChange, 500);

  return (
    <div className="w-full px-4 max-w-[80%] mx-auto">
      <input
        type="text"
        onChange={deb}
        placeholder="🔍 Search for a city..."
        className="w-full px-5 py-3 my-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      {suggestions.length > 0 && (
            <ul className="bg-white border rounded-lg mt-2 shadow-md max-h-60 overflow-auto">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => handleCityClick(city)}
                >
                  {city.city}, {city.country}
                </li>
              ))}
            </ul>
          )}
           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {
        data ? 
        <div className="">
        <div className="max-w-3xl mx-auto">
  
          {data && (
            <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-blue-100 p-6 rounded-3xl shadow-lg mt-10">
              <h1 className="font-semibold text-4xl text-blue-700 mb-6 text-center">
                🌦️ Weather App
              </h1>
              <div className="w-full max-w-sm text-center space-y-5 bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">
                  {data?.name}, {data?.sys?.country}
                </h2>
                <p className="text-gray-600 capitalize text-lg">
                  {data?.weather?.[0]?.description}
                </p>
  
                {data?.weather?.[0]?.icon && (
                  <img
                    className="mx-auto w-20 h-20"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                )}
  
                <div className="space-y-2 text-gray-700 text-base">
                  <p>
                    🌡️ <span className="font-medium">{data?.main?.temp}°C</span>
                  </p>
                  <p>
                    💨{" "}
                    <span className="font-medium">{data?.wind?.speed} m/s</span>
                  </p>
                  <p>
                    💧{" "}
                    <span className="font-medium">{data?.main?.humidity}%</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
  
        {forecast && (
          <div className="mt-12 bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              📆 7-Day Forecast
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {forecast?.list?.slice(0, 7).map((day: any, idx: number) => {
                const date = new Date();
                date.setDate(date.getDate() + idx + 1);
                const formattedDate = date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });
  
                return (
                  <div
                    key={idx}
                    className="bg-blue-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-700">
                      {formattedDate}
                    </h4>
                    <img
                      src={`http://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
                      alt="weather-icon"
                      className="mx-auto w-14 h-14"
                    />
                    <p className="capitalize text-sm text-gray-600">
                      {day?.weather[0].description}
                    </p>
                    <p className="text-lg font-medium text-blue-800">
                      🌡 {day?.main?.temp}°C
                    </p>
                  </div>
                );
              })}
            </div>
  
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-center font-semibold text-2xl mb-6 text-blue-800">
                📈 Temperature Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast?.list?.slice(0, 7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="main.temp"
                    stroke="#1e40af"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        </div>
         : 
        <div className="flex flex-col justify-center items-center h-screen w-full" >
                <div className="text-9xl ">⛅</div>
                <h2 className="text-yellow-600 text-3xl mt-5">search for weather of cities</h2>
        </div>
      }
    </div>
  );
};

export default OpenWeatherComponents;
