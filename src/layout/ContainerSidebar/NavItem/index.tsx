import React, { useCallback } from 'react';

import { Nav } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/hooksAuth';
import { routesEndpoints } from '../../../routes/endpoints';
import { toast } from 'react-toastify';
import { Roles, RolesInput, RolesSelect } from '../../../types/permissions';

interface NavItemProps {
  eventKey: string;
  name: string;
  router: string;
  icone: any;
  role: Roles | RolesInput | RolesSelect;
  onClick?: any;
}

const NavItem: React.FC<NavItemProps> = ({ eventKey, name, router, icone, role, onClick }) => {
  const { getRole, getCookie, SignOut } = useAuth();
  const navigate = useNavigate();


  const handleNav = useCallback(
    (router: string) => {
      if (getCookie('user') === '') {
        SignOut();
        toast.success('Sessão expirada');
        return;
      }

      switch (router) {
        case routesEndpoints.DASHBOARD:
          break;
        case routesEndpoints.CHECKPOINT:
          break;
        case routesEndpoints.CHECKPOINTRELEASE:
          break;
        case routesEndpoints.CONSULTS:
          break;
        case routesEndpoints.GROUPS:
          break;
        case routesEndpoints.SCHENDULE:
          break;
        case routesEndpoints.PERMISSIONS:
          break;
        case routesEndpoints.USERS:
          break;
        case routesEndpoints.USERGROUPS:
          break;
      }
      navigate(router);
    },
    [navigate, getCookie, SignOut]
  );

  return (
    <>
      {getRole(role) && (
        <>
          <Nav.Item eventKey={eventKey} active icon={icone} onSelect={() => handleNav(router)} onClick={onClick}>
            <span>{name}</span>
          </Nav.Item>
        </>
      )}
    </>
  );
};

export default NavItem;
