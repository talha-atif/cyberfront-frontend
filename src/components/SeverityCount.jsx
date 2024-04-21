import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

const SeverityPieChart = () => {
  const [severityCounts, setSeverityCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/docker/severity"
        );
        setSeverityCounts(response.data);
      } catch (error) {
        console.error("Error fetching attack analysis:", error);
      }
    };

    fetchData();
  }, []);

  // Define color mappings for severity levels
  const getColor = (severity) => {
    switch (severity) {
      case "High":
        return "#d9534f"; // Red for high severity
      case "Medium":
        return "#f0ad4e"; // Yellow for medium severity
      case "Low":
        return "#5cb85c"; // Green for low severity
      default:
        return "#8884d8"; // Default color for unknown severity
    }
  };

  const pieChartData = Object.entries(severityCounts).map(
    ([severity, count]) => ({
      severity,
      count,
      fill: getColor(severity), // Assign color based on severity level
    })
  );

  return (
    <div className="flex flex-col px-4 mt-4 w-full text-lg font-bold max-w-[960px] text-neutral-900 max-md:max-w-full">
      <h2 className="tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5 mb-4">
        Container Severity Distribution
      </h2>
      <div className="w-full h-96">
        <PieChart width={400} height={320}>
          <Pie
            data={pieChartData}
            dataKey="count"
            nameKey="severity"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default SeverityPieChart;
