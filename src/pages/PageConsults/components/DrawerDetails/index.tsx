import { Timeline } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Button, Drawer, Panel, Table } from 'rsuite';
import { useConsults } from '../../hooks/hooksConsults';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
}

const DrawerDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel }) => {
  const { Column, HeaderCell, Cell } = Table;
  const { dataDetails } = useConsults();

  const items =
    dataDetails.event && dataDetails.event.status && dataDetails.event.status.history
      ? Object.values(dataDetails.event.status.history).map((item) => ({
          children: (
            <>
              <p>{moment(item.datetime).format('DD/MM/YYYY - HH:mm:ss')}</p>
              <p>{item.user}</p>
              <p>{item.message}</p>
            </>
          )
        }))
      : [];

  useEffect(() => {
    console.log('dataDetails ::', dataDetails);
  }, [dataDetails]);

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
            <Table data={dataDetails.attachment} autoHeight>
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
            <Table data={dataDetails.cvs && dataDetails.cvs.program ? dataDetails.cvs.program : []} autoHeight>
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
