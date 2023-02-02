import React, { ReactNode } from "react";

import { Container, Content, Footer, Header } from "rsuite";
import ContainerSidebar from "../ContainerSidebar";

import Copyright from "../Copyright";

import HeaderArgento from "../Header";

interface useMasterProviderProps {
  children?: ReactNode;
}

const Master: React.FC<useMasterProviderProps> = ({ children }) => {
  return (
    <div className="show-container">
      <Container>
        <Header>
          <HeaderArgento />
        </Header>
        <Container style={{ display: "flex", flexDirection: "row" }}>
          <ContainerSidebar />
          <Content>{children}</Content>
        </Container>
        <Footer>
          <Copyright />
        </Footer>
      </Container>
    </div>
  );
};

export default Master;
