import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Panel, Table } from 'rsuite';
import { TitlePage } from '../GroupsList/styles';
import GroupsList from '../GroupsList';
import { useUserGroups } from '../../PageUserGroups/hooks/hooksUserGroups';
import { GroupsData } from '../hooks/hooksGroups';

interface dataMembros {
  data: GroupsData;
}

const Membros: React.FC<dataMembros> = ({ data }) => {
  const { Column, HeaderCell, Cell } = Table;
  const [showGroups, setShowGroups] = useState(false);
  const { usersData } = useUserGroups();

  const dataTable = Object.values(usersData).filter((item) => item.team_id === data.id);

  if (showGroups) {
    return <GroupsList />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Membros do Grupo - {data.name}</TitlePage>}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button appearance="primary" onClick={() => setShowGroups(true)} style={{ width: 120 }} color="red">
            Voltar
          </Button>
        </div>
        {dataTable.length > 0 ? (
          <Table data={dataTable} autoHeight>
            <Column width={300}>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="name" />
            </Column>
          </Table>
        ) : (
          <span>Grupo sem membros associados</span>
        )}
      </Panel>
    </>
  );
};
export default Membros;
