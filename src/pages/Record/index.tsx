import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumb, Button, Form, Panel, Table } from "rsuite";
import {
  ButtonRegistry,
  Consult,
  ContainerActivities,
  ContainerButton,
  ContainerCard,
  ContainerConsult,
  ContainerConsultButton,
  ContainerOptions,
  Date,
  TextOptions,
} from "./styles";

interface dataForm {
  date?: string;
  checkin?: string;
  checkout?: string;
  pause_inicio?: string;
  pause_termino?: string;
  activities?: string;
}

interface dataConsult {
  consult?: string;
  description?: string;
}

const Record: React.FC = () => {
  const [formData, setFormData] = useState<dataForm>({} as dataForm);
  const [disabled, setDisabled] = useState(false);
  const [dataConsult, setDataConsult] = useState<dataConsult>(
    {} as dataConsult
  );
  const [consults, setConsults] = useState<dataConsult[]>({} as dataConsult[]);
  const { Column, HeaderCell, Cell } = Table;

  const handleConsultAdd = useCallback(() => {
    if (
      dataConsult.consult === undefined ||
      dataConsult.description === undefined
    ) {
      toast.error("Favor preencha os campos de 'Atividades' !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } else {
      const consulta = [];
      consulta.push({
        consult: dataConsult.consult,
        description: dataConsult.description,
      });

      setConsults(consulta);
    }
    setDataConsult({
      ...dataConsult,
      consult: "",
      description: "",
    });
  }, [setConsults, dataConsult, setDataConsult, consults]);

  const handleChange = useCallback(
    (form: dataForm) => {
      console.log(form);
      setFormData(form);
    },
    [setFormData]
  );

  const handleChangeConsult = useCallback(
    (form: dataConsult) => {
      console.log(form);
      setDataConsult(form);
    },
    [setDataConsult]
  );

  useEffect(() => {
    if (
      formData.checkin === undefined ||
      formData.checkout === undefined ||
      formData.date === undefined ||
      formData.pause_inicio === undefined ||
      formData.pause_termino === undefined ||
      dataConsult.consult === undefined ||
      dataConsult.description === undefined
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, formData, dataConsult]);

  return (
    <>
      <Panel header={<h3 className="title">Registro de Ponto</h3>}>
        <Breadcrumb>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro de Ponto</Breadcrumb.Item>
        </Breadcrumb>
        <ContainerCard>
          <Date>
            {formData.date &&
              moment(formData.date).format("DD [de] MMMM [de] YYYY")}
          </Date>
          <div style={{ padding: 20 }} />
          <Form onChange={handleChange}>
            <Form.Group>
              <ContainerOptions>
                <TextOptions>Data: </TextOptions>
                <Form.Control name="date" type="date" />
              </ContainerOptions>
            </Form.Group>

            <div style={{ padding: 10 }} />
            <Form.Group>
              <ContainerOptions>
                <TextOptions>Entrada: </TextOptions>
                <Form.Control type="time" name="checkin" />
              </ContainerOptions>
            </Form.Group>

            <div style={{ padding: 10 }} />

            <span>Almoço/Jantar:</span>

            <ContainerOptions>
              <Form.Group>
                <TextOptions>Início </TextOptions>
                <Form.Control name="pause_inicio" type="time" />
                <TextOptions style={{ paddingLeft: 20 }}>Termino: </TextOptions>
                <Form.Control name="pause_inicio" type="time" />
              </Form.Group>
              <div style={{ padding: 5 }} />
            </ContainerOptions>

            <div style={{ padding: 10 }} />

            <>
              <Form.Group>
                <ContainerOptions>
                  <TextOptions>Saída: </TextOptions>
                  <Form.Control
                    name="checkout"
                    type="time"
                    style={{ marginLeft: 32 }}
                  />
                </ContainerOptions>
              </Form.Group>
              <div style={{ padding: 10 }} />
              <Form.Group>
                <TextOptions>Atividades:</TextOptions>
                <Form.HelpText tooltip>
                  Insira o nº da consulta e o que foi realizado no dia.
                </Form.HelpText>
                <br />

                <Form onChange={handleChangeConsult}>
                  <ContainerActivities>
                    <ContainerConsult>
                      <Consult>Consulta:</Consult>
                      <Form.Control name="consult" />
                    </ContainerConsult>
                    <ContainerConsult>
                      <Consult>Resumo:</Consult>
                      <Form.Control name="description" />
                    </ContainerConsult>
                    <ContainerConsultButton>
                      <Button
                        color="green"
                        appearance="primary"
                        onClick={handleConsultAdd}
                        style={{ width: 100 }}
                      >
                        Adicionar
                      </Button>
                    </ContainerConsultButton>
                  </ContainerActivities>
                </Form>
              </Form.Group>
              {disabled && (
                <ContainerButton>
                  <ButtonRegistry>Registrar</ButtonRegistry>
                </ContainerButton>
              )}
            </>
          </Form>
          <div style={{ padding: 20 }} />
          {Object.keys(consults).length !== 0 && (
            <>
              <Table data={consults}>
                <Column width={300}>
                  <HeaderCell>Consulta</HeaderCell>
                  <Cell dataKey="consult" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Descrição</HeaderCell>
                  <Cell dataKey="description" />
                </Column>
              </Table>
            </>
          )}
        </ContainerCard>
      </Panel>
    </>
  );
};

export default Record;
