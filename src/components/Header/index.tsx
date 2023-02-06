import AdminIcon from "@rsuite/icons/Admin";
import ExitIcon from "@rsuite/icons/Exit";
import React, { useState } from "react";
import { Dropdown, IconButton } from "rsuite";
import logoConecto from "../../assets/logoConecto.png";
import { Container, ContainerAvatar } from "./styles";

const Header: React.FC = () => {
  const [logout, setLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<AdminIcon style={{ width: "100%", height: "100%" }} />}
        circle
        color="blue"
        style={{
          width: 50,
          height: 50,
        }}
      />
    );
  };

  if (logout) {
    window.location.pathname = "";
  }

  if (showProfile) {
    window.location.pathname = "/profile";
  }
  return (
    <Container>
      <img
        src={logoConecto}
        alt="Logo Conecto"
        style={{ height: 70, width: 70 }}
        onClick={() => (window.location.pathname = "/home")}
      />
      <ContainerAvatar>
        <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
          <Dropdown.Item
            onSelect={() => setShowProfile(true)}
            icon={<AdminIcon />}
          >
            Meu Perfil
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setLogout(true)} icon={<ExitIcon />}>
            Sair
          </Dropdown.Item>
        </Dropdown>
      </ContainerAvatar>
    </Container>
  );
};

export default Header;
