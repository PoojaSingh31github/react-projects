// "use client";

// import { useEffect, useState } from "react";

// interface WeatherProps {
//   city: string;
// }

// const WeatherByCity = ({ city }: WeatherProps) => {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
//   const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

//   const fetchWeather = async () => {
//     try {
//       const res = await fetch(
//         `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
//       );
//       if (!res.ok) throw new Error("Failed to fetch weather");
//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, [city]);

//   if (loading) return <p className="text-white">Loading weather...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="w-full max-w-md mx-auto p-6 bg-blue-300 rounded-2xl shadow-md text-center">
//       <h2 className="text-2xl font-bold text-gray-800">
//         {data?.name}, {data?.sys?.country}
//       </h2>
//       <p className="text-gray-600 capitalize">
//         {data?.weather?.[0]?.description}
//       </p>
//       {data?.weather?.[0]?.icon && (
//         <img
//           className="mx-auto w-20 h-20"
//           src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//           alt="Weather Icon"
//         />
//       )}
//       <div className="text-gray-700 mt-2">
//         <p>🌡️ <span className="font-medium">{data?.main?.temp}°C</span></p>
//         <p>💨 <span className="font-medium">{data?.wind?.speed} m/s</span></p>
//         <p>💧 <span className="font-medium">{data?.main?.humidity}%</span></p>
//       </div>
//     </div>
//   );
// };

// export default WeatherByCity;
