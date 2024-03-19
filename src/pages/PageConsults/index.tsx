import React from "react";
import Consults from "./Consults";
import { ReleasePointContextProvider } from "../PageRelease/hooks/hookReleasePoint";
import AppProvider from "./hooks";

const PageConsults: React.FC = () => {
    return (
      <AppProvider>
        <ReleasePointContextProvider>
          <Consults />
        </ReleasePointContextProvider>
      </AppProvider>
    );
}

export default PageConsults;