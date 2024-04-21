import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const AttackPossibilitiesBarChart = () => {
  const [attackPossibilities, setAttackPossibilities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/docker/attack-possibilities"
      );
      setAttackPossibilities(response.data);
    } catch (error) {
      console.error("Error fetching attack possibilities:", error);
    }
  };

  return (
    <div>
      <h2>Bar Chart of Attack Possibilities</h2>
      <BarChart width={800} height={400} data={attackPossibilities}>
        <XAxis dataKey="attackName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF6F61" barSize={20} />{" "}
        {/* Adjust barSize here */}
      </BarChart>
    </div>
  );
};

export default AttackPossibilitiesBarChart;
