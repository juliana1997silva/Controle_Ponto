import React from "react";
import AppProvider from "./hooks";
import UserList from "./UserList";

const PageUsers: React.FC = () => {
  return (
    <AppProvider>
      <UserList />
    </AppProvider>
  );
};

export default PageUsers;
