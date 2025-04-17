'use client';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function StockPageComponent() {
  const [symbol, setSymbol] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [details, setDetails] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSymbols = async () => {
      if (query.length < 2) return;

      const res = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data.bestMatches || []);
    };

    const debounce = setTimeout(fetchSymbols, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    if (!symbol) return;

    const fetchStock = async () => {
      const [detailRes, chartRes] = await Promise.all([
        fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY}`
        ),
        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY}`
        ),
      ]);

      const detailData = await detailRes.json();
      const chartData = await chartRes.json();

      setDetails(detailData['Global Quote']);
      setChartData(chartData['Time Series (Daily)']);
    };

    fetchStock();
  }, [symbol]);

  const formatChartData = () => {
    if (!chartData) return [];
    return Object.entries(chartData)
      .slice(0, 30)
      .map(([date, value]) => {
        const val = value as { [key: string]: string };
        return {
          date,
          close: parseFloat(val['4. close']),
        };
      })
      .reverse();
  };

  const renderChart = () => {
    const data = formatChartData();

    if (!data.length) return null;

    return (
      <div className="w-full h-[400px] mt-8 rounded-xl border shadow-md bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
        📈 Stock Market Dashboard
      </h1>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <input
          className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm transition"
          placeholder="Search stock symbol (e.g. AAPL)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 rounded-lg z-10 max-h-60 overflow-auto shadow-lg">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-3 hover:bg-emerald-50 cursor-pointer transition"
                onClick={() => {
                  setSymbol(s['1. symbol']);
                  setQuery(s['1. symbol']);
                  setSuggestions([]);
                }}
              >
                <span className="font-semibold">{s['1. symbol']}</span> -{' '}
                <span className="text-gray-600">{s['2. name']}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Details */}
      {details && (
        <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-xl mx-auto space-y-2">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            📊 Stock Info
          </h2>
          <p>💰 <b>Price:</b> ${parseFloat(details['05. price']).toFixed(2)}</p>
          <p>📈 <b>High:</b> ${parseFloat(details['03. high']).toFixed(2)}</p>
          <p>📉 <b>Low:</b> ${parseFloat(details['04. low']).toFixed(2)}</p>
          <p>📦 <b>Volume:</b> {details['06. volume']}</p>
          <p>📍 <b>Change:</b> {details['10. change percent']}</p>
        </div>
      )}

      {/* Chart */}
      {renderChart()}
    </div>
  );
}
