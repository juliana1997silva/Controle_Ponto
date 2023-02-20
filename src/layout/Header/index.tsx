import AdminIcon from "@rsuite/icons/Admin";
import ExitIcon from "@rsuite/icons/Exit";
import React from "react";
import { Dropdown, IconButton } from "rsuite";
import logoConecto from "../../assets/logo_conecto.png";
import { useAuth } from "../../hooks/hooksAuth";
import { Container, ContainerAvatar, NameUser } from "./styles";

const Header: React.FC = () => {
  const { user } = useAuth();

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

  return (
    <Container>
      <img
        src={logoConecto}
        alt="Logo Conecto"
        style={{ height: 70, width: 70 }}
        onClick={() => (window.location.pathname = "/home")}
      />
      {user.logged === true && (
        <ContainerAvatar>
          <NameUser>{user?.user?.name}</NameUser>

          <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
            <Dropdown.Item icon={<AdminIcon />}>Meu Perfil</Dropdown.Item>
            <Dropdown.Item icon={<ExitIcon />}>Sair</Dropdown.Item>
          </Dropdown>
        </ContainerAvatar>
      )}
    </Container>
  );
};

export default Header;
