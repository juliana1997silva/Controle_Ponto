import React from "react";
import UserGroups from "./UserGroups";
import AppProvider from "./hooks";

const PageUserGroups: React.FC = () => {
    return (
      <AppProvider>
        <UserGroups />
      </AppProvider>
    );
}

export default PageUserGroups;