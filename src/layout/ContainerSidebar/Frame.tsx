import DocPassIcon from '@rsuite/icons/DocPass';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import TaskIcon from '@rsuite/icons/Task';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Nav, Sidenav } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useAuth } from '../../hooks/hooksAuth';

const Frame: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <div>
      <Sidenav>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<DashboardIcon />} onSelect={() => navigate('/dashboard')}>
              Dashboard
            </Nav.Item>
            {user.admin === 1 && (
              <>
                <Nav.Item eventKey="2" icon={<DocPassIcon />} onSelect={() => navigate('/release-checkpoint')}>
                  Liberar Ficha
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<DocPassIcon />} onSelect={() => navigate('/users')}>
                  Usuarios
                </Nav.Item>
                <Nav.Item eventKey="6" icon={<DocPassIcon />} onSelect={() => navigate('/groups')}>
                  Grupos
                </Nav.Item>
                {/* <Nav.Item eventKey="6" icon={<DocPassIcon />} onSelect={() => navigate('/coordinator')}>
                  Coordenadores
                </Nav.Item> */}
              </>
            )}
            <Nav.Item eventKey="4" icon={<TaskIcon />} onSelect={() => navigate('/checkpoint')}>
              Registro Ponto
            </Nav.Item>

            <Nav.Item eventKey="5" icon={<DocPassIcon />} onSelect={() => navigate('/teste')}>
              Agenda
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
