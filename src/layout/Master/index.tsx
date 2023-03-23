import React from "react";

import { Container, Content, Footer, Header } from "rsuite";
import ContainerSidebar from "../ContainerSidebar";

import { Outlet } from "react-router-dom";
import Copyright from "../../layout/Copyright";
import HeaderTempus from "../Header";

const Master: React.FC = () => {
  return (
    <div className="show-container">
      <Container>
        <Header>
          <HeaderTempus />
        </Header>
        <Container>
          <ContainerSidebar />
          <Content>
            <Outlet />
          </Content>
        </Container>
        <Footer>
          <Copyright />
        </Footer>
      </Container>
    </div>
  );
};

export default Master;
