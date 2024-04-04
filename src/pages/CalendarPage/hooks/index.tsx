import React from "react";
import { IProps } from "../../../types";
import { CalendarContextProvider } from "./hooksCalendar";
import { ReleasePointContextProvider } from "../../PageRelease/hooks/hookReleasePoint";

const AppProvider: React.FC<IProps> = ({ children }) => (
  <ReleasePointContextProvider>
    <CalendarContextProvider>{children}</CalendarContextProvider>
  </ReleasePointContextProvider>
); ;

export default AppProvider;
