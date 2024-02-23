import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, IconButton } from 'rsuite';
import logoTempus from '../../assets/logoTempus.png';
import { useAuth } from '../../hooks/hooksAuth';
import { Container, ContainerAvatar, NameUser } from './styles';

const Header: React.FC = () => {
  const { user, SignOut } = useAuth();
  const navigate = useNavigate();

  const renderIconButton = (props: any, ref: any) => {
    return <IconButton {...props} ref={ref} icon={<NameUser>{user?.name}</NameUser>} style={{ backgroundColor: 'transparent' }} />;
  };

  return (
    <Container>
      <img
        src={logoTempus}
        alt="Logo Tempus"
        style={{ height: 50, marginTop: 10, marginLeft: 15 }}
        onClick={() => navigate('/dashboard')}
      />
      {user.token && (
        <ContainerAvatar>
          <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
            <Dropdown.Item onSelect={() => navigate('/profile')} icon={<AdminIcon />}>
              Meu Perfil
            </Dropdown.Item>
            <Dropdown.Item onSelect={SignOut} icon={<ExitIcon />}>
              Sair
            </Dropdown.Item>
          </Dropdown>
        </ContainerAvatar>
      )}
    </Container>
  );
};

export default Header;
