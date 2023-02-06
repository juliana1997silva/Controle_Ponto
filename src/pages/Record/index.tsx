import moment from "moment";
import "moment/locale/pt-br"; //importação efetuar a tradução da data para portugues
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
  Divider10,
  Divider20,
  Divider5,
  Pause,
  PulaLinha,
  TextOptions,
  TitlePage,
} from "./styles";

interface dataForm {
  date?: string;
  checkin?: string;
  checkout?: string;
  pause_inicio?: string;
  pause_termino?: string;
  consult?: string;
  description?: string;
}

interface dataConsult {
  consult?: string;
  description?: string;
}

const Record: React.FC = () => {
  const [formData, setFormData] = useState<dataForm>({} as dataForm);
  const [disabled, setDisabled] = useState(false);
  const [consults] = useState<dataConsult[]>([]);
  const { Column, HeaderCell, Cell } = Table;

  const handleConsultAdd = useCallback(() => {
    if (formData.consult === undefined || formData.description === undefined) {
      toast.error("Favor preencha os campos de 'Atividades' !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } else {
      consults.push({
        consult: formData.consult,
        description: formData.description,
      });
    }

    setFormData({
      ...formData,
      consult: "",
      description: "",
    });
  }, [formData, setFormData, consults]);

  const handleChange = useCallback(
    (form: dataForm) => {
      setFormData(form);
    },
    [setFormData]
  );

  useEffect(() => {
    if (
      formData.checkin === undefined ||
      formData.checkout === undefined ||
      formData.date === undefined ||
      formData.pause_inicio === undefined ||
      formData.pause_termino === undefined ||
      consults.length === 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, formData, consults]);

  return (
    <>
      <Panel
        header={<TitlePage className="title">Registro de Ponto</TitlePage>}
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro de Ponto</Breadcrumb.Item>
        </Breadcrumb>
        <ContainerCard>
          <Date>
            {formData.date &&
              moment(formData.date)
                .locale("pt-br")
                .format("DD [de] MMMM [de] YYYY")}
          </Date>
          <Divider20 />
          <Form onChange={handleChange}>
            <Form.Group>
              <ContainerOptions>
                <TextOptions>Data: </TextOptions>
                <Form.Control name="date" type="date" />
              </ContainerOptions>
            </Form.Group>

            <Divider10 />
            <Form.Group>
              <ContainerOptions>
                <TextOptions>Entrada: </TextOptions>
                <Form.Control type="time" name="checkin" />
              </ContainerOptions>
            </Form.Group>

            <Divider10 />

            <Pause>Almoço/Jantar:</Pause>

            <ContainerOptions>
              <Form.Group>
                <TextOptions>Início </TextOptions>
                <Form.Control name="pause_inicio" type="time" />
                <TextOptions style={{ paddingLeft: 20 }}>Termino: </TextOptions>
                <Form.Control name="pause_termino" type="time" />
              </Form.Group>
              <Divider5 />
            </ContainerOptions>

            <Divider10 />

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
              <Divider10 />
              <Form.Group>
                <TextOptions>Atividades:</TextOptions>
                <Form.HelpText tooltip>
                  Insira o nº da consulta e o que foi realizado no dia.
                </Form.HelpText>
                <PulaLinha />
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
              </Form.Group>
            </>
          </Form>
          <Divider20 />
          {Object.keys(consults).length !== 0 && (
            <>
              <Table data={consults} autoHeight>
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
          {disabled && (
            <ContainerButton>
              <ButtonRegistry>Registrar</ButtonRegistry>
            </ContainerButton>
          )}
        </ContainerCard>
      </Panel>
    </>
  );
};

export default Record;
