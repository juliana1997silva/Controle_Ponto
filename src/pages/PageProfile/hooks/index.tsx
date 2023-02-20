import React from "react";
import { IProps } from "../../../types";
import { ProfileContextProvider } from "../hooks/hookProfile";

const AppProvider: React.FC<IProps> = ({ children }) => (
  <ProfileContextProvider>{children}</ProfileContextProvider>
);

export default AppProvider;
