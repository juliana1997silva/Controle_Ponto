import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./hooks";
import { Router } from "./routes";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppProvider>
    </>
  );
};
export default App;
