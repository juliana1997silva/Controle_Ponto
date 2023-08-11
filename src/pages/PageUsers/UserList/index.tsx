import React, { useLayoutEffect, useState } from 'react';
import { Button, Panel, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import RegistrationUsers from '../RegistrationUsers';
import { useUsers } from '../hooks/hooksUsers';
import { ContainerButton, TitlePage } from './styles';

const UserList: React.FC = () => {
  const { dataListUsers, listUsers,setFormDataUser } = useUsers();
  const [showRegister, setShowRegister] = useState(false);
  const { Column, HeaderCell, Cell } = Table;

  useLayoutEffect(() => {
    if (dataListUsers.length === undefined) listUsers();
  });

  if (showRegister) {
    return <RegistrationUsers />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Usuarios</TitlePage>}>
        <BreadcrumbComponent active="Usuarios" href="/dashboard" label="Dashboard" />
        <ContainerButton>
          <Button
            appearance="primary"
            type="submit"
            style={{ backgroundColor: '#00a6a6', width: 120 }}
            onClick={() => setShowRegister(true)}
          >
            Novo
          </Button>
        </ContainerButton>

        <Table autoHeight data={dataListUsers}>
          <Column width={300}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column width={300}>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any) => {
                return(
                <>
                  <Button
                    appearance="primary"
                    type="submit"
                    style={{ backgroundColor: '#93c916' }}
                    onClick={() => {
                      setShowRegister(true);
                      setFormDataUser(rowData)
                    }}
                  >
                    Editar
                  </Button>
                </>
                )
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </>
  );
};

export default UserList;
