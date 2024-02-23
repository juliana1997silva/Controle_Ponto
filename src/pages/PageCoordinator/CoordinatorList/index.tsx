import React, { useEffect, useState } from 'react';
import { Button, Panel, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import CoordinatorRegister from '../CoordinatorRegister';
import { useCoordinator } from '../hooks/hooksCoordinator';
import { ContainerButton, TitlePage } from './styles';

const CoordinatorList: React.FC = () => {
  const { listCoordinator, list, dataCoordinator, setCoordinatorStore, setMode, releaseCoordinator } = useCoordinator();
  const { Column, HeaderCell, Cell } = Table;
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!list) listCoordinator();
  }, [list, listCoordinator]);

  if (showRegister) {
    return <CoordinatorRegister />;
  }

  return (
    <>
      <Panel header={<TitlePage className="title">Coordenadores</TitlePage>}>
        <BreadcrumbComponent active="Coordenadores" href="/dashboard" label="Dashboard" />
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
        <Table data={dataCoordinator}>
          <Column width={300}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={200}>
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
                        setCoordinatorStore(rowData);
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
                          releaseCoordinator(rowData.id);
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
                          releaseCoordinator(rowData.id);
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

export default CoordinatorList;
