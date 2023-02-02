import React, { useState } from "react";
import { Dropdown } from "rsuite";
import foto from "../../assets/exemplo.jpeg";
import logoConecto from "../../assets/logoConecto.png";
import { Container, ContainerAvatar } from "./styles";

const Header: React.FC = () => {
  const [logout, setLogout] = useState(false);

  if (logout) {
    window.location.pathname = "/";
  }

  return (
    <Container>
      <img
        src={logoConecto}
        alt="Logo Conecto"
        style={{ height: 50 }}
        onClick={() => (window.location.pathname = "/home")}
      />
      <ContainerAvatar>
        <Dropdown
          noCaret
          placement="bottomEnd"
          renderTitle={(children) => {
            return (
              <img
                src={foto}
                alt="foto exemplo"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  textAlign: "center",
                }}
              />
            );
          }}
        >
          <Dropdown.Item onSelect={() => setLogout(true)}>Sair</Dropdown.Item>
        </Dropdown>
      </ContainerAvatar>
    </Container>
  );
};

export default Header;
