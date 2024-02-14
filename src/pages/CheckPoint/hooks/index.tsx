import React from "react";
import { IProps } from "../../../types";
import { CheckPointContextProvider } from "./hookCheckPoint";

const AppProviderCheckpoint: React.FC<IProps> = ({ children }) => (
  <CheckPointContextProvider>{children}</CheckPointContextProvider>
);

export default AppProviderCheckpoint;
