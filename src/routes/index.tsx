import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Fallback from '../components/Fallback';
import Master from '../layout/Master';
import NoMatch from '../layout/NoMatch';
import PrivateRoute from './PrivateRoute';

const Signin = React.lazy(() => import('../pages/Login'));
const Home = React.lazy(() => import('../pages/Home'));
const PageCheckPoint = React.lazy(() => import('../pages/CheckPoint'));
const PageProfile = React.lazy(() => import('../pages/PageProfile'));
const PageRelease = React.lazy(() => import('../pages/PageRelease'));
const PageUsers = React.lazy(() => import('../pages/PageUsers'));
const PageGroups = React.lazy(() => import('../pages/PageGroups'));
const PageCoordinator = React.lazy(() => import('../pages/PageCoordinator'));
const CalendarPage = React.lazy(() => import('../pages/CalendarPage'));
const PageConsults = React.lazy(() => import('../pages/PageConsults'));
const PageUserGroups = React.lazy(() => import('../pages/PageUserGroups'));
const PagePermissions = React.lazy(() => import('../pages/PagePermissions'));

export function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          <React.Suspense fallback={<Fallback />}>
            <Signin />
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
                <PageCheckPoint />
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
          path="/schedule"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageUsers />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/groups"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageGroups />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/coordinator"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageCoordinator />
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
          path="/consults"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageConsults />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/user-groups"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PageUserGroups />
              </PrivateRoute>
            </React.Suspense>
          }
        />
        <Route
          path="/permissions"
          element={
            <React.Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <PagePermissions />
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
