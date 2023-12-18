import React, { useEffect, useState } from 'react';
import { Button, Table } from 'rsuite';
import { useCheckPoint } from '../hooks/hookCheckPoint';
import moment from 'moment';
import 'moment/locale/pt-br';
import Point from '../Point';

const ListPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const { listPoint, dataRegister, showPoint, setMode } = useCheckPoint();
  const [showCreated, setShowCreated] = useState(false);

  useEffect(() => {
    if (dataRegister.length === 0) listPoint();
  }, [dataRegister, listPoint]);

  if (showCreated) {
    return <Point />;
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end'
        }}
      >
        <Button appearance="primary" color="green" onClick={() => setShowCreated(true)}>
          Novo
        </Button>
      </div>
      <Table data={dataRegister} autoHeight>
        <Column width={150} align="center">
          <HeaderCell>Data</HeaderCell>
          <Cell>{(rowData: any) => <span>{moment(rowData.date, "YYYY-MM-DD").format('DD-MM-YYYY')}</span>}</Cell>
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
          <Cell dataKey="lunch_entry_time" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Saída</HeaderCell>
          <Cell dataKey="out_time" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <>
                <Button
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
