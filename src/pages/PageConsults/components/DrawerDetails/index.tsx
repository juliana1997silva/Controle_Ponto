import { Timeline, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Button, Drawer, Panel, Table } from 'rsuite';
import { useConsults } from '../../hooks/hooksConsults';
import Loading from '../../../../components/Loading';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
  request_key: string;
}

const DrawerDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel, request_key }) => {
  const { Column, HeaderCell, Cell } = Table;
  const { TextArea } = Input;
  const { dataDetails } = useConsults();

  const statusDescription = dataDetails.status_description || '';
  let datas;
  if (statusDescription.includes('..')) {
    datas = statusDescription.split('..');
  } else if (statusDescription.includes('<br>')) {
    datas = statusDescription.split('<br>');
  } else {
    datas = [statusDescription];
  }

  const textoComQuebras = datas.map((data, index) => data.trim()).join('\n');

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

  return (
    <Drawer open={open} onClose={onClose} size="calc(100% - 120px)">
      <Drawer.Header>
        <Drawer.Title>
          {request_key} - {dataDetails.description}
        </Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClickCancel} color="red" appearance="primary">
            Fechar
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      {dataDetails.description ? (
        <Drawer.Body>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '55%' }}>
            <div style={{ marginRight: 15 }}>
              <span>Inicio Previsto</span>
              <Input
                value={dataDetails.planned_begin_time && moment(dataDetails.planned_begin_time).format('DD/MM/YYYY - HH:mm:ss')}
                disabled
              />
              <span>Fim Previsto</span>
              <Input
                value={dataDetails.planned_end_time && moment(dataDetails.planned_end_time).format('DD/MM/YYYY - HH:mm:ss')}
                disabled
              />
            </div>
            <div>
              <span>Inicio Real</span>
              <Input value={dataDetails.begin_time && moment(dataDetails.begin_time).format('DD/MM/YYYY - HH:mm:ss')} disabled />
              <span>Fim Real</span>
              <Input value={dataDetails.end_time && moment(dataDetails.end_time).format('DD/MM/YYYY - HH:mm:ss')} disabled />
            </div>
          </div>
          <div style={{ padding: 5 }} />
          <h5>Detalhamento da Situação</h5>
          <div style={{ padding: 5 }} />
          <TextArea readOnly={true} autoSize={{ minRows: 10, maxRows: 10 }} value={textoComQuebras} disabled />
          <div style={{ padding: 5 }} />
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
      ) : (
        <Loading />
      )}
    </Drawer>
  );
};
export default DrawerDetails;
