import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import { Router } from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CookiesProvider>
          <AppProvider>
            <Router />
          </AppProvider>
        </CookiesProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
