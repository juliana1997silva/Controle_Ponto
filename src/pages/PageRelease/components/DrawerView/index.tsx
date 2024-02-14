import React from "react";
import { data, useCheckPoint } from "../../../CheckPoint/hooks/hookCheckPoint";
import { Divider, Drawer, Table } from "rsuite";
import { PulaLinha, TitleRegistry } from "./styles";
import { useReleasePoint } from "../../hooks/hookReleasePoint";
import moment from "moment";

interface dataView {
    name: string;
}

const DrawerView: React.FC<dataView> = ({name}) => {
    const { Column, HeaderCell, Cell } = Table;
    const { openView, setOpenView } = useReleasePoint();
    const { dataRegisterStore } = useCheckPoint();

    return (
      <Drawer
        open={openView}
        onClose={() => {
          setOpenView(false);
        }}
        size="md"
      >
        <Drawer.Body>
          <TitleRegistry>{name}</TitleRegistry>
          <PulaLinha />
          {dataRegisterStore.business !== undefined && (
            <>
              <Table data={[dataRegisterStore.business]}>
                <Column resizable>
                  <HeaderCell>Data:</HeaderCell>
                  <Cell>{(rowData: any) => <span>{moment(rowData.date).format('DD/MM/YYYY')}</span>}</Cell>
                </Column>
                <Column resizable>
                  <HeaderCell>Entrada:</HeaderCell>
                  <Cell dataKey="entry_time" />
                </Column>
                <Column resizable>
                  <HeaderCell>Inicio Pausa:</HeaderCell>
                  <Cell dataKey="lunch_entry_time" />
                </Column>
                <Column resizable>
                  <HeaderCell>Termino Pausa:</HeaderCell>
                  <Cell dataKey="lunch_out_time" />
                </Column>
                <Column resizable>
                  <HeaderCell>Sáida:</HeaderCell>
                  <Cell dataKey="out_time" />
                </Column>
              </Table>

              {dataRegisterStore.nonbusiness && (
                <>
                  <Divider>Horário Não Comercial</Divider>

                  <Table data={dataRegisterStore.nonbusiness} style={{ width: '100%' }}>
                    <Column resizable>
                      <HeaderCell>Entrada:</HeaderCell>
                      <Cell dataKey="entry_time" />
                    </Column>
                    <Column resizable>
                      <HeaderCell>Inicio Pausa:</HeaderCell>
                      <Cell dataKey="lunch_entry_time" />
                    </Column>
                    <Column resizable>
                      <HeaderCell>Termino Pausa:</HeaderCell>
                      <Cell dataKey="lunch_out_time" />
                    </Column>
                    <Column resizable>
                      <HeaderCell>Sáida:</HeaderCell>
                      <Cell dataKey="out_time" />
                    </Column>
                  </Table>
                </>
              )}

              {dataRegisterStore.consults && (
                <>
                  <Divider>Consultas Registradas no dia</Divider>

                  <Table data={dataRegisterStore.consults} style={{ width: '100%' }}>
                    <Column resizable>
                      <HeaderCell>Nº Consulta:</HeaderCell>
                      <Cell dataKey="queries" />
                    </Column>
                    <Column resizable>
                      <HeaderCell>Descrição:</HeaderCell>
                      <Cell dataKey="description" />
                    </Column>
                  </Table>
                </>
              )}
            </>
          )}

          <Divider />
        </Drawer.Body>
      </Drawer>
    );
}

export default DrawerView;