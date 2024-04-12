import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import { Router } from './routes';
import 'rsuite/dist/rsuite.min.css'; 
import 'react-toastify/dist/ReactToastify.css';

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
