import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RedDashboard from "./Red-Dashboard/Red-Dashboard";
import Attack from "./Attack/Attack";
import AttackSuggestions from "./Attack-AI/Attack-AI";
import Scanner from "./Scanner/Scanner";
import BlueDashboard from "./Blue-Dashboard/Blue-Dashboard";
import Defend from "./Defence/Defence";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedDashboard />} />
        <Route path="/red-dashboard" element={<RedDashboard />} />
        <Route path="/attack" element={<Attack />} />
        <Route path="/attack-ai" element={<AttackSuggestions />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/blue-dashboard" element={<BlueDashboard />} />
        <Route path="/defend" element={<Defend />} />
      </Routes>
    </Router>
  );
}

export default App;
