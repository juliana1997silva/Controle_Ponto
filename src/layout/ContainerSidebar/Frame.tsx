import DocPassIcon from '@rsuite/icons/DocPass';
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import TaskIcon from '@rsuite/icons/Task';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, Sidenav } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useAuth } from '../../hooks/hooksAuth';

const NavToggle = ({ expand, onChange }: any) => {
  return (
    <Navbar className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <PagePreviousIcon /> : <PageNextIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const Frame: React.FC = () => {
  const navigate = useNavigate();
  const { user, expanded, setExpanded } = useAuth();

  return (
    <div>
      <Sidenav expanded={expanded} style={{ color: '#1976d2' }}>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<DashboardIcon />} onSelect={() => navigate('/dashboard')}>
              Dashboard
            </Nav.Item>
            {user.admin === 1 || user.manager === 1 ? (
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
                <Nav.Item eventKey="7" icon={<DocPassIcon />} onSelect={() => navigate('/consults')}>
                  Consultas
                </Nav.Item>
              </>
            ) : (
              <></>
            )}
            <Nav.Item eventKey="4" icon={<TaskIcon />} onSelect={() => navigate('/checkpoint')}>
              Registro Ponto
            </Nav.Item>

            <Nav.Item eventKey="5" icon={<DocPassIcon />} onSelect={() => navigate('/schedule')}>
              Agenda
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expanded} onChange={() => setExpanded(!expanded)} />
    </div>
  );
};

export default Frame;
