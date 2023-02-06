import React from "react";

import { Route, Routes } from "react-router-dom";
import Master from "../components/Master";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Record from "../pages/Record";
import ReleaseHour from "../pages/ReleaseHour";

const RoutesApp: React.FC = () => {
  if (window.location.pathname === "/") {
    return <Login />;
  }
  return (
    <Master>
      <Routes>
        <Route path="/registry" element={<Record />} />
        <Route path="/home" element={<Home />} />
        <Route path="/release" element={<ReleaseHour />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Master>
  );
};

export default RoutesApp;
