import DocPassIcon from '@rsuite/icons/DocPass';
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import TaskIcon from '@rsuite/icons/Task';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import AdminIcon from '@rsuite/icons/Admin';
import PeoplesIcon from '@rsuite/icons/Peoples';
import CodeIcon from '@rsuite/icons/Code';
import PeoplesUploadedIcon from '@rsuite/icons/PeoplesUploaded';
import CalendarIcon from '@rsuite/icons/Calendar';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, Sidenav } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useAuth } from '../../hooks/hooksAuth';
import NavItem from './NavItem';

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
            <NavItem eventKey="1" icone={<DashboardIcon />} name="Dashboard" role="menu_dashboard" router="/dashboard" />
            <NavItem
              eventKey="2"
              icone={<DocPassIcon />}
              name="Liberação Ficha"
              role="menu_release_checkpoint"
              router="/release-checkpoint"
            />
            <NavItem eventKey="3" icone={<AdminIcon />} name="Usuarios" role="menu_users" router="/users" />

            <NavItem eventKey="4" icone={<PeoplesIcon />} name="Grupos" role="menu_groups" router="/groups" />

            <NavItem eventKey="5" icone={<CodeIcon />} name="Consultas" role="menu_consults" router="/consults" />

            <NavItem eventKey="6" icone={<PeoplesUploadedIcon />} name="Usuarios X Grupos" role="menu_user_groups" router="/user-groups" />

            <NavItem eventKey="7" icone={<SettingHorizontalIcon />} name="Permissões" role="menu_permissions" router="/permissions" />

            <NavItem eventKey="8" icone={<TaskIcon />} name="Registro Ponto" role="menu_checkpoint" router="/checkpoint" />

            <NavItem eventKey="9" icone={<CalendarIcon />} name="Agenda" role="menu_schedule" router="/schedule" />
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expanded} onChange={() => setExpanded(!expanded)} />
    </div>
  );
};

export default Frame;
