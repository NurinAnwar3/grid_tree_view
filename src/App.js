import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./dashboard";
import Homepage from './pages/Homepage/index'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<Homepage />} />

      </Routes>
    </Router>
  );
}

export default App;
