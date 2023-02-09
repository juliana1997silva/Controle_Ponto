import React from "react";

import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import ContainerSidebar from "../ContainerSidebar";

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
        </Header>
        <Container>
          <Sidebar>
            <ContainerSidebar />
          </Sidebar>
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
