import React from "react";
import { IProps } from "../../../types";
import { ReleasePointContextProvider } from "./hookReleasePoint";

const AppProvider: React.FC<IProps> = ({ children }) => (
  <ReleasePointContextProvider>{children}</ReleasePointContextProvider>
);

export default AppProvider;
