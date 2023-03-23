import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import DocPassIcon from "@rsuite/icons/DocPass";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import TaskIcon from "@rsuite/icons/Task";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Nav, Sidebar, Sidenav } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Frame: React.FC = () => {
  const navegate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expanded ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expanded}>
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                eventKey="1"
                icon={<DashboardIcon />}
                onSelect={() => navegate("/dashboard")}
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                eventKey="2"
                icon={<TaskIcon />}
                onSelect={() => navegate("/checkpoint")}
              >
                Registro Ponto
              </Nav.Item>
              <Nav.Item
                eventKey="3"
                icon={<CheckOutlineIcon />}
                onSelect={() => navegate("/release-checkpoint")}
              >
                Liberação Ficha
              </Nav.Item>
              <Nav.Item
                eventKey="4"
                icon={<CheckOutlineIcon />}
                onSelect={() => navegate("/teste")}
              >
                Teste Calendario
              </Nav.Item>
              <Nav.Item
                eventKey="5"
                icon={<DocPassIcon />}
                onSelect={() => navegate("/users-registration")}
              >
                Cadastro Usuarios
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
          />
        </Sidenav>
      </Sidebar>
    </div>
  );
};

export default Frame;
