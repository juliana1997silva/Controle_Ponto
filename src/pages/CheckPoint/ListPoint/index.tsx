import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import { Button, Table, Tag } from 'rsuite';
import Point from '../Point';
import { useCheckPoint } from '../hooks/hookCheckPoint';

const ListPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const { listPoint, dataRegister, showPoint, setMode, setUpdateData } = useCheckPoint();
  const [showCreated, setShowCreated] = useState(false);

  useEffect(() => {
    if (dataRegister.length === 0) listPoint();
    setUpdateData(false);
  }, [dataRegister, listPoint, setUpdateData]);

  if (showCreated) {
    return <Point />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          padding: 10
        }}
      >
        <Button appearance="primary" color="green" style={{ width: 120 }} onClick={() => setShowCreated(true)}>
          Novo
        </Button>
      </div>
      <Table data={dataRegister} autoHeight>
        <Column width={150} align="center">
          <HeaderCell>Data</HeaderCell>
          <Cell>{(rowData: any) => <span>{moment(rowData.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}</span>}</Cell>
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Local</HeaderCell>
          <Cell dataKey="location" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Entrada</HeaderCell>
          <Cell dataKey="entry_time" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Inicio Pausa</HeaderCell>
          <Cell dataKey="lunch_entry_time" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Termino Pausa</HeaderCell>
          <Cell dataKey="lunch_out_time" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Saída</HeaderCell>
          <Cell dataKey="out_time" />
        </Column>
        <Column width={80}>
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData: any) => {
              switch (rowData.status) {
                case 'approved':
                  return <Tag color="green">Aprovado</Tag>;
                case 'disapproved':
                  return <Tag color="red">Reprovado</Tag>;
                case 'pending':
                  return <Tag color="orange">Pendente</Tag>;
              }
            }}
          </Cell>
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <>
                <Button
                  appearance="primary"
                  color="blue"
                  onClick={() => {
                    showPoint(rowData.id);
                    setShowCreated(true);
                    setMode('edit');
                  }}
                >
                  Editar
                </Button>
              </>
            )}
          </Cell>
        </Column>
      </Table>
    </>
  );
};

export default ListPoint;
