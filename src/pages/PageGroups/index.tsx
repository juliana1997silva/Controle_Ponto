import React from "react";
import GroupsList from "./GroupsList";
import AppProvider from "./hooks";


const PageGroups: React.FC = () => {
    return (
      <AppProvider>
        <GroupsList />
      </AppProvider>
    );
}

export default PageGroups;