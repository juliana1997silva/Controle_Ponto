import React from "react";
import AppProvider from "./hooks";
import ReleaseCheckPoint from "./ReleaseCheckPoint";
import AppProviderCheckpoint from "../CheckPoint/hooks";

const PageRelease: React.FC = () => {
  return (
    <AppProviderCheckpoint>
      <AppProvider>
        <ReleaseCheckPoint />
      </AppProvider>
    </AppProviderCheckpoint>
  );
};
export default PageRelease;
