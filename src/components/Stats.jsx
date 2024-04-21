import * as React from "react";
import axios from "axios";

function StatCard({ value, label }) {
  return (
    <div className="flex flex-col grow p-3 text-center rounded-lg border border-solid border-zinc-200 max-md:px-5 max-md:mt-6">
      <div className="text-2xl font-bold tracking-tight text-neutral-900">
        {value}
      </div>
      <div className="mt-2 text-sm leading-5 text-slate-500">{label}</div>
    </div>
  );
}

function Stats() {
  const [stats, setStats] = React.useState({
    // Initialize with default values if needed
    "Total Attacks": 0,
    "Attacks Won": 0,
    "Attacks Defended": 0,
  });
  const [totalUsers, setTotalUsers] = React.useState(0);

  React.useEffect(() => {
    getStats();
    getTotalUsers();
  }, []);

  const getStats = () => {
    const backendURL = "http://localhost:5000/docker/stats";
    axios
      .get(backendURL)
      .then((response) => {
        // Handle success, update the stats state with appropriate keys
        setStats(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching stats:", error);
      });
  };

  const getTotalUsers = () => {
    const backendURL = "http://localhost:5000/users/stats";
    axios
      .get(backendURL)
      .then((response) => {
        // Directly set the total users state
        setTotalUsers(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching users:", error);
      });
  };

  return (
    <section className="justify-center px-4 py-3 w-full max-w-[960px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {Object.entries(stats).map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
          >
            <StatCard value={value} label={label} />
          </div>
        ))}
        {Object.entries(totalUsers).map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
          >
            <StatCard value={value} label={label} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
