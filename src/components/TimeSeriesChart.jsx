import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const TimeSeriesLineChart = () => {
  const [attackData, setAttackData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/docker/time-series-attacks"
      );
      const transformedData = transformData(response.data);
      setAttackData(transformedData);
    } catch (error) {
      console.error("Error fetching time series attack data:", error);
    }
  };

  // Function to transform server response data into Recharts-compatible format
  const transformData = (data) => {
    const transformed = data.map((entry) => {
      const transformedEntry = { date: entry.date };
      Object.keys(entry).forEach((key) => {
        if (key !== "date" && entry[key] !== undefined) {
          transformedEntry[key] = entry[key];
        }
      });
      return transformedEntry;
    });
    return transformed;
  };

  return (
    <div>
      <h2>Time Series Line Chart of Attack Trends</h2>
      <LineChart width={800} height={400} data={attackData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(attackData[0] || {}).map(
          (key) =>
            key !== "date" && (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={getStrokeColor(key)}
              />
            )
        )}
      </LineChart>
    </div>
  );
};

// Helper function to assign stroke color based on attack type
const getStrokeColor = (attackType) => {
  switch (attackType) {
    case "DoS":
      return "#8884d8";
    case "Expose-Hashes":
      return "#82ca9d";
    case "Expose-Filesystem":
      return "#ffc658";
    case "Privilege-Escalation":
      return "#ff7300";
    case "Expose-Namespace":
      return "#ff0000";
    case "Change-Password":
      return "#00ff00";
    case "Expose-Secrets":
      return "#0000ff";
    case "Payload-Delivery":
      return "#ff00ff";
    default:
      return "#000000";
  }
};

export default TimeSeriesLineChart;
