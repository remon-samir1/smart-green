import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PhreadingChart() {
  const [data, setData] = useState([]);
  const [maxPoints, setMaxPoints] = useState(7); 




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://wincc-api.vercel.app/parameters/inputs_phreading"); 
        const json = await res.json();

        setData(prev => {
          const newPoint = {
            value: json.value,
            time: new Date(json.updated_at).toLocaleTimeString(),
          };
          const updated = [...prev, newPoint];
          return updated.slice(-maxPoints);
        });
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [maxPoints]);

  return (
    <div  style={{ width: "100%", height: 400 }}>
      <h2 style={{color:'#4ECCA3'}}>Phreading Readings</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
