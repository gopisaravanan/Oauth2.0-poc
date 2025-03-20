import React from "react";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
