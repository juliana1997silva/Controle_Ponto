import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import { Router } from './routes';

const App: React.FC = () => {
  return (
    <>
      <CookiesProvider>
        <AppProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AppProvider>
      </CookiesProvider>
    </>
  );
};
export default App;
