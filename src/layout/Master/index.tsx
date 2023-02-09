import React from "react";

import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import ContainerSidebar from "../ContainerSidebar";

import { Outlet } from "react-router";
import Copyright from "../../layout/Copyright";
import HeaderTempus from "../Header";

interface useMasterProviderProps {
  children?: React.ReactNode;
}

const Master: React.FC<useMasterProviderProps> = ({ children }) => {
  return (
    <div className="show-container">
      <Container>
        <Header>
          <HeaderTempus />
          <Outlet />
        </Header>
        <Container>
          <Sidebar>
            <ContainerSidebar />
            <Outlet />
          </Sidebar>
          <Content>{children}</Content>
        </Container>
        <Footer>
          <Copyright />
          <Outlet />
        </Footer>
      </Container>
    </div>
  );
};

export default Master;
