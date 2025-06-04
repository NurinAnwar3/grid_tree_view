import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./dashboard";
import Homepage from './pages/Homepage/index'
import Material from './pages/material/index'
import FinishedGoods from './pages/FInishedGoods/index'
// import { LicenseInfo } from '@mui/x-license-pro'

// LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/login" />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/material" element={<Material />} />
        <Route path="/finished-goods" element={<FinishedGoods />} />

      </Routes>
    </Router>
  );
}

export default App;
