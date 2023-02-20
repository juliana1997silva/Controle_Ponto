import React from "react";
import AppProvider from "./hooks";
import ReleaseCheckPoint from "./ReleaseCheckPoint";

const PageRelease: React.FC = () => {
  return (
    <>
      <AppProvider>
        <ReleaseCheckPoint />
      </AppProvider>
    </>
  );
};
export default PageRelease;
