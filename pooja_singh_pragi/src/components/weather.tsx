'use client'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { fetchWeather } from '@/store/weatherReducer';

export default function Weather() {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);
  const [city, setCity] = useState('');

  const handleSearch = () => {
    // dispatch(fetchWeather(city));
  };

  return (
    <div className="p-4 mt-4 bg-white rounded shadow text-center">
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {weather.status === 'loading' && <p>Loading...</p>}
      {weather.status === 'succeeded' && weather.data && (
        <div className="mt-4">
          <p>Temperature: {weather.data.main.temp} °C</p>
          <p>Weather: {weather.data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
