import React from "react";

import { Route, Routes } from "react-router-dom";

import Fallback from "../components/Fallback";
import Master from "../layout/Master";
import NoMatch from "../layout/NoMatch";
import PrivateRoute from "./PrivateRoute";

// import Master from "../layout/Master";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Profile from "../pages/Profile";
// import Record from "../pages/Record";
// import ReleaseHour from "../pages/ReleaseHour";
// import Report from "../pages/Report";

const Login = React.lazy(() => import('../pages/Login'))
const Home = React.lazy(() => import('../pages/Home'))

export function Router() {

  return (
    <Routes>
      <Route index element={
        <React.Suspense fallback={<Fallback />}>
          <Login />
        </React.Suspense>
      } />
      <Route path="/" element={<Master />}>
        <Route path='/dashboard' element={
          <React.Suspense fallback={<Fallback />}>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </React.Suspense>
        } />
        <Route path="*" element={
          <React.Suspense fallback={<Fallback />}>
            <PrivateRoute>
              <NoMatch />
            </PrivateRoute>
          </React.Suspense>
        } />
      </Route>
    </Routes>
  );
};