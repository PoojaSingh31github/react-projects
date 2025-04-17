"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ForecastChart({ data }: { data: any[] }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" />
    </LineChart>
  );
}
