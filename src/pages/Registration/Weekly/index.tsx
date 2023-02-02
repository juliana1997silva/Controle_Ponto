import React, { useCallback, useEffect, useState } from "react";
import { Button, Drawer, Form, Panel, Table } from "rsuite";
import Textarea from "../../../components/TextArea";
import { FormData } from "../../../types";

const Registration: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [dataForm, setDataForm] = useState<FormData>({} as FormData);

  const handleChange = useCallback((form: any) => {
    console.log(form);
  }, []);

  const data = [
    {
      date: "30/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "18:00",
      bank_hours: "01:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "31/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "18:40",
      bank_hours: "01:40",
      activities: "Desenvolvimento .......",
    },
    {
      date: "01/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "02/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:30",
      bank_hours: "00:30",
      activities: "Desenvolvimento .......",
    },
    {
      date: "03/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:10",
      bank_hours: "00:10",
      activities: "Desenvolvimento .......",
    },
  ];

  useEffect(() => {
    const hora = data.map((item) => {
      return item.bank_hours;
    });
    var soma = 0;

    for (var i = 0; hora.length; i++) {
      soma += Number(hora[i]);
    }

    console.log(soma);
  });

  return (
    <>
      <Panel header={<h3 className="title">Relatorio Semanal</h3>}>
        <Table data={data} autoHeight>
          <Column width={150}>
            <HeaderCell>Data</HeaderCell>
            <Cell dataKey="date" />
          </Column>
          <Column width={150}>
            <HeaderCell>Entrada</HeaderCell>
            <Cell dataKey="checkin" />
          </Column>
          <Column width={150}>
            <HeaderCell>Inicio Pausa</HeaderCell>
            <Cell dataKey="pause_checkin" />
          </Column>
          <Column width={150}>
            <HeaderCell>Termino Pausa</HeaderCell>
            <Cell dataKey="pause_checkout" />
          </Column>
          <Column width={150}>
            <HeaderCell>Saída</HeaderCell>
            <Cell dataKey="checkout" />
          </Column>
          <Column width={150}>
            <HeaderCell>Banco de Horas</HeaderCell>
            <Cell dataKey="bank_hours" />
          </Column>
          <Column width={300}>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any, rowIndex: any) => {
                return (
                  <>
                    <Button
                      color="green"
                      appearance="primary"
                      onClick={() => {
                        setOpenModal(true);
                        setDisabled(true);
                        console.log(rowData);
                        setDataForm(rowData);
                      }}
                    >
                      Visualizar
                    </Button>
                    <Button
                      color="cyan"
                      appearance="primary"
                      onClick={() => {
                        setOpenModal(true);
                        setDataForm(rowData);
                        setDisabled(false);
                      }}
                    >
                      Editar
                    </Button>{" "}
                    {/* quando o horario for aprovado pelo coordenador, a opção editar nao ficara mais disponivel */}
                  </>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
      <Drawer open={openModal} onClose={() => setOpenModal(false)}>
        <Drawer.Body>
          <Form formDefaultValue={dataForm} onChange={handleChange}>
            <h4>Registro de Ponto</h4>
            <br />
            <Form.ControlLabel>Data:</Form.ControlLabel>
            <Form.Control name="date" disabled={disabled} />
            <Form.ControlLabel>Entrada:</Form.ControlLabel>
            <Form.Control name="checkin" disabled={disabled} />
            <Form.ControlLabel>Inicio Pausa:</Form.ControlLabel>
            <Form.Control name="pause_checkin" disabled={disabled} />
            <Form.ControlLabel>Termino Pausa</Form.ControlLabel>
            <Form.Control name="pause_checkout" disabled={disabled} />
            <Form.ControlLabel>Saida</Form.ControlLabel>
            <Form.Control name="checkout" disabled={disabled} />
            <Form.ControlLabel>Banco de Horas</Form.ControlLabel>
            <Form.Control name="bank_hours" disabled={disabled} />
            <Form.ControlLabel>Atividades</Form.ControlLabel>
            <Form.Control
              name="activities"
              disabled={disabled}
              accepter={Textarea}
            />
          </Form>
          {!disabled ? (
            <>
              <div style={{ textAlign: "end", paddingTop: 50 }}>
                <Button
                  color="green"
                  appearance="primary"
                  style={{ width: 130, margin: 10 }}
                  onClick={() => setOpenModal(false)}
                >
                  Salvar
                </Button>
                <Button
                  color="red"
                  appearance="primary"
                  style={{ width: 130 }}
                  onClick={() => setOpenModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "end", paddingTop: 50 }}>
              <Button
                color="red"
                appearance="primary"
                style={{ width: 130 }}
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
            </div>
          )}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Registration;
