import React from "react";
import { IProps } from "../types";

import { AuthContextProvider } from "./hooksAuth";
import { GroupsContextProvider } from "../pages/PageGroups/hooks/hooksGroups";
import { CoordinatorContextProvider } from "../pages/PageCoordinator/hooks/hooksCoordinator";

const AppProvider: React.FC<IProps> = ({ children }) => (
  <AuthContextProvider>
    <GroupsContextProvider>
      <CoordinatorContextProvider>{children}</CoordinatorContextProvider>
    </GroupsContextProvider>
  </AuthContextProvider>
);
export default AppProvider;
