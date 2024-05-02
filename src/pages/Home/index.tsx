import React from 'react';
//import { useAuth } from '../../hooks/hooksAuth';
import Dashboard from './Dashboard';
import AppProvider from './hooks';

const Home: React.FC = () => {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
};

export default Home;
