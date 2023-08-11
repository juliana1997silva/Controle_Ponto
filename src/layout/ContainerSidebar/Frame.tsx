import DocPassIcon from '@rsuite/icons/DocPass';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import TaskIcon from '@rsuite/icons/Task';
import React from 'react';

import { Nav, Sidenav } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Frame: React.FC = () => {
  return (
    <div>
      <Sidenav>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<DashboardIcon />} href="/dashboard">
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<TaskIcon />} href="/checkpoint">
              Registro Ponto
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<DocPassIcon />} href="/release-checkpoint">
              Liberar Ficha
            </Nav.Item>
            <Nav.Item eventKey="4" icon={<DocPassIcon />} href="/users-registration">
              Usuarios
            </Nav.Item>
            {/* <Nav.Menu eventKey="4" title="Relatorios" icon={<WavePointIcon />}>
              <Nav.Item eventKey="4-1" href="/weekly">
                Relatorio Semanal
              </Nav.Item>
              <Nav.Item eventKey="4-2">Relatorio Mensal</Nav.Item>
              <Nav.Item eventKey="4-3">Relatorio Quadrimestral</Nav.Item>
            </Nav.Menu> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Frame;
