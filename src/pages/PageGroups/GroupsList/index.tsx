import React, { useCallback, useEffect, useState } from 'react';
import { Button, Panel, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useAuth } from '../../../hooks/hooksAuth';
import GroupsRegister from '../GroupsRegister';
import { GroupsData, useGroups } from '../hooks/hooksGroups';
import { ContainerButton, TitlePage } from './styles';
import AcessPermissions from '../AcessPermissions';
import { useUserGroups } from '../../PageUserGroups/hooks/hooksUserGroups';
import Membros from '../Membros';
import { PermissionsData } from '../../PagePermissions/hooks/hooksPermission';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import ButtonCustom from '../../../components/ButtonCustom';

const GroupsList: React.FC = () => {
  const { user } = useAuth();
  const { Column, HeaderCell, Cell } = Table;
  const { listGroups, dataGroups, list, setMode, setGroupStore, releaseGroup } = useGroups();
  const { listUsersGroups } = useUserGroups();
  const [showRegister, setShowRegister] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showMembros, setShowMembros] = useState(false);
  const [data, setData] = useState<GroupsData>({} as GroupsData);
  const [permissonsData, setPermissionsData] = useState<PermissionsData>({} as PermissionsData);

  const handlePermissions = useCallback(
    (dataPermissions: PermissionsData) => {
      console.log('dataPermissions::', dataPermissions);
      setPermissionsData(dataPermissions);
      setShowPermissions(true);
    },
    [setShowPermissions, setPermissionsData]
  );

  const handleMembros = useCallback(
    (idGroup: string) => {
      console.log('idGroup::', idGroup);
      listUsersGroups(idGroup);
      setShowMembros(true);
    },
    [setShowMembros, listUsersGroups]
  );

  useEffect(() => {
    if (!list) listGroups();
  }, [list, listGroups]);

  if (showPermissions) {
    return <AcessPermissions data={permissonsData} />;
  }

  if (showRegister) {
    return <GroupsRegister />;
  }

  if (showMembros) {
    return <Membros data={data} />;
  }

  return (
    <>
      <Panel header={<TitlePage className="title">Grupos</TitlePage>}>
        <BreadcrumbComponent active="Grupos" href="/dashboard" label="Dashboard" />
        <ContainerButton>
          <ButtonCustom
            appearance="primary"
            type="submit"
            style={{ backgroundColor: '#1976D2', width: 120 }}
            onClick={() => setShowRegister(true)}
            role="button_new_groups"
          >
            Novo
          </ButtonCustom>
        </ContainerButton>
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

          <Column width={500}>
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
                      <>
                        <Button
                          appearance="primary"
                          type="submit"
                          color="blue"
                          onClick={() => {
                            handlePermissions(rowData);
                            console.log('permissão :) ');
                          }}
                        >
                          Permissões
                        </Button>
                        <Button
                          appearance="primary"
                          type="submit"
                          color="cyan"
                          onClick={() => {
                            handleMembros(rowData.id);
                            setData(rowData);
                          }}
                        >
                          Membros
                        </Button>
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
                      </>
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
