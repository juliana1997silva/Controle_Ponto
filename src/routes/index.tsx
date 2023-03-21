import React from "react";

import { Route, Routes } from "react-router-dom";

import Fallback from "../components/Fallback";
import Master from "../layout/Master";
import NoMatch from "../layout/NoMatch";
import Calendar from "../pages/CalendarPage";
import PageProfile from "../pages/PageProfile";
import PageRelease from "../pages/PageRelease";
import PageUsers from "../pages/PageUsers";
import PrivateRoute from "./PrivateRoute";

const Login = React.lazy(() => import("../pages/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const CheckPoint = React.lazy(() => import("../pages/CheckPoint"));

export function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          <React.Suspense fallback={<Fallback />}>
            <Login />
          </React.Suspense>
        }
      />
      <Route path="/" element={<Master />}>
        <Route
          path="/dashboard"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/checkpoint"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <CheckPoint />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/release-checkpoint"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageRelease />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/teste"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/users-registration"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageUsers />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageProfile />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <NoMatch />
              </PrivateRoute>
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
