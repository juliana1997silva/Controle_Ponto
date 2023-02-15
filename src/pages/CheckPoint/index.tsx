import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Input, Modal, Panel, Table } from "rsuite";
import { useAuth } from "../../hooks/hooksAuth";
import { TitlePage } from "./styles";

const { Column, HeaderCell, Cell, ColumnGroup } = Table;

interface dataForm {
  date: any;
  entry_time: string;
  location: string;
  lunch_entry_time: string;
  lunch_out_time: string;
  out_time: string;
  entry_time_commercial?: string;
  lunch_entry_time_commercial?: string;
  lunch_out_time_commercial?: string;
  out_time_commercial?: string;
  status: string | null;
}
/*
interface exemploValueDate {
  key: number;
  date: string;
}*/

const CheckPoint: React.FC = () => {
  const mes = new Date().getMonth();
  const ano = new Date().getFullYear();
  const { user } = useAuth();
  const rowKey = "date";
  const [openModal, setOpenModal] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const value = moment().locale("pt-br").month(mes).year(ano);

  const calendar = Array();

  const [data, setData] = useState<dataForm[]>([]);

  moment.updateLocale("pt", {
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthsShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
  });

  const EditableCell = ({ rowData, dataKey, onChange, ...props }: any) => {
    const editing = rowData.status === "EDIT";
    let value = "";
    if (dataKey) if (rowData[dataKey]) value = rowData[dataKey];
    return (
      <Cell {...props} className={editing ? "table-content-editing" : ""}>
        {editing ? (
          <Input
            className="rs-input"
            defaultValue={rowData[dataKey] ? rowData[dataKey] : value}
            onChange={(event) => {
              onChange && onChange(rowData.date, dataKey, event);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }: any) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <Button
          appearance="link"
          onClick={() => {
            onClick(rowData.date);
          }}
        >
          {rowData?.status === "EDIT" ? "Save" : "Edit"}
        </Button>
      </Cell>
    );
  };

  const ExpandCell = ({
    rowData,
    dataKey,
    expandedRowKeys,
    onChange,
    ...props
  }: any) => (
    <Cell {...props} style={{ padding: 5 }}>
      <IconButton
        appearance="subtle"
        onClick={() => {
          onChange(rowData);
        }}
        icon={
          expandedRowKeys.some(
            (key: any) => key === rowData[rowData.rowKey]
          ) ? (
            <CollaspedOutlineIcon />
          ) : (
            <ExpandOutlineIcon />
          )
        }
      />
    </Cell>
  );

  const renderRowExpanded = (rowData: any) => {
    return (
      <div>
        {/* <div
          style={{
            width: 60,
            height: 60,
            float: "left",
            marginRight: 10,
            background: "#eee",
          }}
        ></div> */}
        {rowData.activities.map((item: any) => {
          return (
            <div style={{ height: "100%" }}>
              <p>Consulta: {item.consult}</p>
              <p>Descrição: {item.description}</p>
              <br />
            </div>
          );
        })}
      </div>
    );
  };

  const handleExpanded = (rowData: any, dataKey: any) => {
    let open = false;
    const nextExpandedRowKeys: any = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

  const handleChange = (date: any, key: any, value: any) => {
    const nextData: any = Object.assign([], data);
    nextData.find((item: any) => item.date === date)[key] = value;
    console.log(nextData);
    setData(nextData);
  };

  const handleEditState = (date: any) => {
    const nextData = Object.assign([], data);
    const activeItem: any = nextData.find((item: any) => item.date === date);
    activeItem.status = activeItem.status ? null : "EDIT";
    setData(nextData);
  };

  useEffect(() => {
    const startDay = value.clone().startOf("month");
    const endDay = value.clone().endOf("month");
    const day = startDay.clone().subtract(1, "day");

    while (day.isBefore(endDay, "day")) {
      if (value.format("MMMM") === "Fevereiro") {
        calendar.push(
          Array(28)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      } else if (
        value.format("MMMM") === "Janeiro" ||
        value.format("MMMM") === "Março" ||
        value.format("MMMM") === "Maio" ||
        value.format("MMMM") === "Julho" ||
        value.format("MMMM") === "Agosto" ||
        value.format("MMMM") === "Outubro" ||
        value.format("MMMM") === "Dezembro"
      ) {
        calendar.push(
          Array(31)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      } else {
        calendar.push(
          Array(30)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      }
    }

    const date = calendar.map((month) => {
      return month.map((day: any, index: any) => {
        return {
          date: moment(day._d).format("DD/MMM/YYYY"),
          entry_time: user.user.parameter.entry_time,
          location: "Home_Office",
          lunch_entry_time: user.user.parameter.lunch_entry_time,
          lunch_out_time: user.user.parameter.lunch_out_time,
          out_time: user.user.parameter.out_time,
          status: null,
          activities: [
            { consult: "45238", description: "Teste 001" },
            { consult: "57862", description: "Teste 002" },
            { consult: "87695", description: "Teste 003" },
          ],
        };
      });
    });
    setData(date[0]);
  }, []);

  return (
    <>
      <Panel
        header={<TitlePage className="title">Registro de Ponto</TitlePage>}
      >
        <Table
          autoHeight
          data={data}
          cellBordered
          height={420}
          headerHeight={80}
          bordered
          rowKey={rowKey}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={renderRowExpanded}
        >
          <Column>
            <HeaderCell>#</HeaderCell>
            <ExpandCell
              dataKey="date"
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpanded}
            />
          </Column>
          <Column width={150} sortable align="center">
            <HeaderCell>Data</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Local</HeaderCell>
            <EditableCell dataKey="location" onChange={handleChange} />
          </Column>
          <ColumnGroup header="Horário Comercial" align="center">
            <Column width={100} colSpan={4}>
              <HeaderCell>Entrada</HeaderCell>
              <EditableCell dataKey="entry_time" onChange={handleChange} />
            </Column>
            <Column width={100}>
              <HeaderCell>Inicio Pausa</HeaderCell>
              <EditableCell
                dataKey="lunch_entry_time"
                onChange={handleChange}
              />
            </Column>
            <Column width={100}>
              <HeaderCell>Termino Pausa</HeaderCell>
              <EditableCell dataKey="lunch_out_time" onChange={handleChange} />
            </Column>
            <Column width={100}>
              <HeaderCell>Saída</HeaderCell>
              <EditableCell dataKey="out_time" onChange={handleChange} />
            </Column>
          </ColumnGroup>

          <ColumnGroup header="Horário Não Comercial" align="center">
            <Column width={100}>
              <HeaderCell>Entrada</HeaderCell>
              <EditableCell
                dataKey="entry_time_commercial"
                onChange={handleChange}
              />
            </Column>
            <Column width={100}>
              <HeaderCell>Inicio Pausa</HeaderCell>
              <EditableCell
                dataKey="lunch_entry_time_commercial"
                onChange={handleChange}
              />
            </Column>
            <Column width={100}>
              <HeaderCell>Termino Pausa</HeaderCell>
              <EditableCell
                dataKey="lunch_out_time_commercial"
                onChange={handleChange}
              />
            </Column>
            <Column width={100}>
              <HeaderCell>Saída</HeaderCell>
              <EditableCell
                dataKey="out_time_commercial"
                onChange={handleChange}
              />
            </Column>
          </ColumnGroup>

          <Column width={250}>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any) => {
                return (
                  <>
                    <Button
                      appearance="link"
                      onClick={() => handleEditState(rowData.date)}
                    >
                      {rowData?.status === "EDIT" ? "Save" : "Edit"}
                    </Button>
                    <Button
                      appearance="link"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Incluir Consultas
                    </Button>
                  </>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>

      {openModal && (
        <>
          <Modal
            keyboard={false}
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <span>CONSULTA OK</span>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)} appearance="primary">
                Ok
              </Button>
              <Button onClick={() => setOpenModal(false)} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default CheckPoint;
