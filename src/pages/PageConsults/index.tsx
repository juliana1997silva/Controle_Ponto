import React from "react";
import Consults from "./Consults";
import { ReleasePointContextProvider } from "../PageRelease/hooks/hookReleasePoint";

const PageConsults: React.FC = () => {
    return (
      <ReleasePointContextProvider>
        <Consults />
      </ReleasePointContextProvider>
    );
}

export default PageConsults;