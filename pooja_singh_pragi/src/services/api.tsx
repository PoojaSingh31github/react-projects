import axios from "axios";

export const fetchCities = async (query: string) => {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
      {
        params: { namePrefix: query, limit: 5 },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_GEODB_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
    return response.data.data; // array of cities
  };
  
  // 2. Fetch weather using OpenWeatherMap
  export const fetchWeather = async (lat: any, lon:any) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
          units: 'metric',
        },
      }
    );
    return response.data;
  };
   
  