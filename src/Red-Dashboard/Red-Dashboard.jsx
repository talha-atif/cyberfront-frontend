import React from "react";
import RedHeader from "../components/RedHeader";
import Stats from "../components/Stats";
import LogsTable from "../components/Logs";
import Chatbot from "../components/Chatbot";
import AttackTypeDistribution from "../components/AttackTypeDistribution";
import SeverityPieChart from "../components/SeverityCount";
import TimeSeriesLineChart from "../components/TimeSeriesChart";
import AttackPossibilitiesBarChart from "../components/AttackPossibilities";

function RedDashboard() {
  return (
    <div>
      <RedHeader />
      <div
        className="mx-auto max-w-[960px] max-md:px-5"
        style={{ paddingBottom: "50px" }}
      >
        <header className="content flex items-start py-1 px-4 mt-5 max-w-full text-2xl font-bold tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
          <h2>Dashboard</h2>
        </header>
        <Stats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
          <div className="w-full md:w-auto flex-grow px-3 pt-3 rounded-lg border border-solid border-zinc-200 max-md:px-5 max-md:mt-6">
            <SeverityPieChart />
          </div>
          <div className="w-full md:w-auto flex-grow px-3 pt-3 rounded-lg border border-solid border-zinc-200 max-md:px-5 max-md:mt-6">
            <AttackTypeDistribution />
          </div>
        </div>
        <LogsTable />
      </div>
      <div>
        <Chatbot />
      </div>
    </div>
  );
}

export default RedDashboard;
