import React from "react";
import { IProps } from "../../../types";
import { CalendarContextProvider } from "./hooksCalendar";

const AppProvider: React.FC<IProps> = ({ children }) => <CalendarContextProvider>{children}</CalendarContextProvider>;

export default AppProvider;
