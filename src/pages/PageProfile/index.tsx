import React from "react";
import AppProvider from "./hooks";
import Profile from "./Profile";

const PageProfile: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Profile />
      </AppProvider>
    </>
  );
};

export default PageProfile;
