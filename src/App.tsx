import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./hooks";
import RoutesApp from "./routes";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </AppProvider>
    </>
  );
};
export default App;
