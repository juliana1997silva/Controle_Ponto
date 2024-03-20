import { Timeline } from 'antd';
import moment from 'moment';
import React from 'react';
import { Button, Drawer, Panel, Table } from 'rsuite';
import data from './data.json';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
}

const DrawerDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel }) => {
  const { Column, HeaderCell, Cell } = Table;

  const items = Object.values(data.event.status.history).map((item) => {
    return {
      children: (
        <>
          <p>{moment(item.datetime).format('DD/MM/YYYY - HH:mm:ss')}</p>
          <p>{item.user}</p>
          <p>{item.message}</p>
        </>
      )
    };
  });

  return (
    <>
      <Drawer open={open} onClose={onClose} size="calc(100% - 120px)">
        <Drawer.Header>
          <Drawer.Title>Detalhes da Consulta</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={onClickCancel} color="red" appearance="primary">
              Fechar
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Panel header="Historico Situação" collapsible bordered>
            <Timeline items={items} />
          </Panel>
          <Panel header="Documentos Anexados" collapsible bordered>
            <Table data={data.attachment} autoHeight>
              <Column width={600}>
                <HeaderCell>Nome Documento</HeaderCell>
                <Cell dataKey="name" />
              </Column>
              <Column width={320}>
                <HeaderCell>Descrição</HeaderCell>
                <Cell dataKey="description" />
              </Column>
              <Column width={200}>
                <HeaderCell>Data</HeaderCell>
                <Cell>{(rowData: any) => <span>{moment(rowData.insertion).format('DD/MM/YYYY - HH:mm:ss')}</span>}</Cell>
              </Column>
              <Column width={100}>
                <HeaderCell>Usuario</HeaderCell>
                <Cell dataKey="user" />
              </Column>
            </Table>
          </Panel>
          <Panel header="Commits" collapsible bordered>
            <Table data={data.cvs.program} autoHeight>
              <Column width={150}>
                <HeaderCell>Versão</HeaderCell>
                <Cell dataKey="version" />
              </Column>
              <Column width={300}>
                <HeaderCell>Arquivo</HeaderCell>
                <Cell dataKey="file" />
              </Column>
              <Column width={300}>
                <HeaderCell>Usuario</HeaderCell>
                <Cell dataKey="user" />
              </Column>
            </Table>
          </Panel>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
export default DrawerDetails;
