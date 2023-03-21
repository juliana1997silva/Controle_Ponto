import AdminIcon from "@rsuite/icons/Admin";
import ExitIcon from "@rsuite/icons/Exit";
import React from "react";
import { useNavigate } from "react-router";
import { Dropdown, IconButton } from "rsuite";
import fotoPerfil from "../../assets/foto perfil.jpg";
import logoConecto from "../../assets/logo_conecto.png";
import { useAuth } from "../../hooks/hooksAuth";
import { Container, ContainerAvatar, NameUser } from "./styles";

const Header: React.FC = () => {
  const { user } = useAuth();
  const navegate = useNavigate();

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={
          <img
            style={{ width: 50, height: 50, borderRadius: 20, margin: 0 }}
            src={fotoPerfil}
          />
        }
        circle
        color="blue"
        style={{
          width: 50,
          height: 50,
          padding: 0,
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
        onClick={() => navegate("/dashboard")}
      />
      {user.logged === true && (
        <ContainerAvatar>
          <NameUser>{user?.user?.name}</NameUser>

          <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
            <Dropdown.Item
              icon={<AdminIcon />}
              onSelect={() => navegate("/profile")}
            >
              Meu Perfil
            </Dropdown.Item>
            <Dropdown.Item icon={<ExitIcon />}>Sair</Dropdown.Item>
          </Dropdown>
        </ContainerAvatar>
      )}
    </Container>
  );
};

export default Header;
