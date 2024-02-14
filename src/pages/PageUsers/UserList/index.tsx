import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Panel, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import RegistrationUsers from '../RegistrationUsers';
import { useUsers } from '../hooks/hooksUsers';
import { ContainerButton, TitlePage } from './styles';

const UserList: React.FC = () => {
  const { dataListUsers, listUsers, setFormDataUser, setMode, releaseUsers, showRegister, setShowRegister } = useUsers();
  const { Column, HeaderCell, Cell } = Table;

  useLayoutEffect(() => {
    if (dataListUsers.length === undefined) listUsers();
  }, [dataListUsers, listUsers]);

  console.log('showRegister:: ', showRegister);

  if (showRegister){
    return <RegistrationUsers />
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
              onClick={() => setShowRegister(!showRegister)}
            >
              Novo
            </Button>
          </ContainerButton>

          {dataListUsers.length !== undefined ? (
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
                <HeaderCell>Status</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    return (
                      <>
                        {rowData.status === 1 ? (
                          <>
                            {/* <div style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'green'}} /> */}
                            <span>Ativo</span>
                          </>
                        ) : (
                          <>
                            {/* <div style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }} /> */}
                            <span>Inativo</span>
                          </>
                        )}
                      </>
                    );
                  }}
                </Cell>
              </Column>
              <Column width={300}>
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    return (
                      <>
                        <Button
                          appearance="primary"
                          type="submit"
                          style={{ backgroundColor: '#93c916' }}
                          onClick={() => {
                            setShowRegister(true);
                            setFormDataUser(rowData);
                            setMode('edit');
                          }}
                        >
                          Editar
                        </Button>
                        {rowData.status === 0 ? (
                          <Button
                            appearance="primary"
                            type="submit"
                            color="green"
                            onClick={() => {
                              releaseUsers(rowData.id);
                            }}
                          >
                            Ativar
                          </Button>
                        ) : (
                          <Button
                            appearance="primary"
                            type="submit"
                            color="red"
                            onClick={() => {
                              releaseUsers(rowData.id);
                            }}
                          >
                            Desativar
                          </Button>
                        )}
                      </>
                    );
                  }}
                </Cell>
              </Column>
            </Table>
          ) : (
            <span>Sem Usuarios cadastrados</span>
          )}
        </Panel>
      </>
    );
};

export default UserList;
