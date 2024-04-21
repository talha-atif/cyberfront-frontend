import axios from "axios";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttackTypeDistribution = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchAttackCounts();
  }, []);

  const fetchAttackCounts = async () => {
    try {
      const backendUrl = "http://localhost:5000/docker/attack-counts";
      axios.get(backendUrl).then((response) => {
        const attackCounts = response.data;
        setData(
          Object.entries(attackCounts).map(([name, value]) => ({
            name,
            value,
          }))
        );
      });
    } catch (error) {
      console.error("Error fetching attack types:", error);
    }
  };

  return (
    <div className="flex flex-col px-4 mt-4 w-full text-lg font-bold max-w-[960px] text-neutral-900 max-md:max-w-full">
      <h2 className="tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5 mb-4">
        Attack Type Distribution
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="horizontal"
          barSize={10}
          barGap={2}
          margin={{ top: 20 }}
          style={{ fontSize: "12px" }}
        >
          <YAxis type="number" />
          <XAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#082f49" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttackTypeDistribution;
