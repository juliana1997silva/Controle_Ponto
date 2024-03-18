import React, { useEffect, useState } from 'react';
import { Button, Panel, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useAuth } from '../../../hooks/hooksAuth';
import GroupsRegister from '../GroupsRegister';
import { useGroups } from '../hooks/hooksGroups';
import { ContainerButton, TitlePage } from './styles';

const GroupsList: React.FC = () => {
  const { user } = useAuth();
  const { Column, HeaderCell, Cell } = Table;
  const { listGroups, dataGroups, list, setMode, setGroupStore, releaseGroup } = useGroups();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!list) listGroups();
  }, [list, listGroups]);

  if (showRegister) {
    return <GroupsRegister />;
  }

  return (
    <>
      <Panel header={<TitlePage className="title">Grupos</TitlePage>}>
        <BreadcrumbComponent active="Grupos" href="/dashboard" label="Dashboard" />
        {user.admin === 1 && (
          <ContainerButton>
            <Button
              appearance="primary"
              type="submit"
              style={{ backgroundColor: '#1976D2', width: 120 }}
              onClick={() => setShowRegister(true)}
            >
              Novo
            </Button>
          </ContainerButton>
        )}
        <Table data={dataGroups}>
          <Column width={300}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
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
                      color="orange"
                      onClick={() => {
                        setShowRegister(true);
                        setMode('edit');
                        setGroupStore(rowData);
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
                          releaseGroup(rowData.id);
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
                          releaseGroup(rowData.id);
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
      </Panel>
    </>
  );
};

export default GroupsList;
