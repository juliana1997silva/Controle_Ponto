import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import TaskIcon from "@rsuite/icons/Task";
import React from "react";
import { useNavigate } from "react-router";

import { Nav, Sidenav } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Frame: React.FC = () => {
  const navegate = useNavigate();
  return (
    <div>
      <Sidenav>
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
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Frame;
