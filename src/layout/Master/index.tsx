import React, { useEffect, useMemo } from 'react';

import { Container, Content, Footer, Header, Sidebar } from 'rsuite';
import ContainerSidebar from '../ContainerSidebar';

import { Outlet } from 'react-router';
import Copyright from '../../layout/Copyright';
import HeaderTempus from '../Header';
import { Cookies } from 'react-cookie';
import { useAuth } from '../../hooks/hooksAuth';

interface useMasterProviderProps {
  children?: React.ReactNode;
}

const Master: React.FC<useMasterProviderProps> = ({ children }) => {

  const {SignOut, expanded} = useAuth()

  const cookies = useMemo(() => new Cookies(), []);
  useEffect(() => {
    if (cookies.getAll().user === undefined) {
      SignOut();
    }
  }, [cookies, SignOut]);

  return (
    <div className="show-container">
      <Container>
        <Header>
          <HeaderTempus />
        </Header>
        <Container>
          <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expanded ? 260 : 56} collapsible>
            <ContainerSidebar />
          </Sidebar>
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
