import React from "react";
import { IProps } from "../../../types";
import { CheckPointContextProvider } from "./hookCheckPoint";

const AppProvider: React.FC<IProps> = ({ children }) => (
  <CheckPointContextProvider>{children}</CheckPointContextProvider>
);

export default AppProvider;
