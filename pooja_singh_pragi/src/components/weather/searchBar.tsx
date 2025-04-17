'use client';
import { fetchCities } from '@/services/api';
import { fetchWeather } from '@/store/weatherReducer';
import React, { useState } from 'react';

interface City {
  city: string;
  latitude: number |string;
  longitude: number | string;
  country: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [weather, setWeather] = useState<any>(null);


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
    console.log("inside handle funtion ")
    setQuery(`${city.city}, ${city.country}`);
    setSuggestions([]);
    const weatherData = await fetchWeather(city.latitude, city.longitude);
    console.log( weatherData, " data from inside handle funtion ")
    setWeather(weatherData);
  };


  const debounce =(func:any, delay:number)=>{
    let timeout:any;
    return function (args:any) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(args)
      }, delay);
    }
  }

  const deb = debounce(handleChange, 1000)

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        onChange={deb}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 border rounded shadow"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded mt-2">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCityClick(city)}
            >
              {city.city}, {city.country}
            </li>
          ))}
        </ul>
      )}

      {/* {weather && (
        <div className="mt-4 p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-bold">{weather.name}</h3>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌧 Weather: {weather.weather[0].description}</p>
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
