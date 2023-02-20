import React from "react";
import AppProvider from "./hooks";
import CheckPointPage from "./Point";

const PageCheckPoint: React.FC = () => {
  return (
    <>
      <AppProvider>
        <CheckPointPage />
      </AppProvider>
    </>
  );
};

export default PageCheckPoint;
