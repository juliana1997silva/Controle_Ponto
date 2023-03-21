import React from "react";
import { Button, ButtonToolbar, Divider, Form, Panel, Schema } from "rsuite";
import BreadcrumbComponent from "../../../components/Breadcrumb";
import { DivButton, DivHour, DivPause, TitlePage } from "./styles";

const RegistrationUsers: React.FC = () => {
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired("Este Campo é Obrigatório"),
    tel: StringType().isRequired("Este Campo é Obrigatório"),
    mail: StringType().isRequired("Este Campo é Obrigatório"),
    department: StringType().isRequired("Este Campo é Obrigatório"),
    coordinator: StringType().isRequired("Este Campo é Obrigatório"),
    entry_time: StringType().isRequired("Este Campo é Obrigatório"),
    lunch_entry_time: StringType().isRequired("Este Campo é Obrigatório"),
    lunch_out_time: StringType().isRequired("Este Campo é Obrigatório"),
    out_time: StringType().isRequired("Este Campo é Obrigatório"),
  });
  return (
    <>
      <Panel
        header={<TitlePage className="title">Cadastro de Usuarios</TitlePage>}
      >
        <BreadcrumbComponent
          active="Cadastro de Usuarios"
          hrefBack="/dashboard"
          label="Dashboard"
        />
        <Form model={model}>
          <Form.Group controlId="name">
            <Form.ControlLabel>Nome:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group controlId="tel">
            <Form.ControlLabel>Telefone:</Form.ControlLabel>
            <Form.Control name="tel" />
          </Form.Group>
          <Form.Group controlId="mail">
            <Form.ControlLabel>E-mail:</Form.ControlLabel>
            <Form.Control name="mail" />
          </Form.Group>
          <Form.Group controlId="department">
            <Form.ControlLabel>Departamento:</Form.ControlLabel>
            <Form.Control name="department" />
          </Form.Group>
          <Form.Group controlId="coordinator">
            <Form.ControlLabel>Coordenador:</Form.ControlLabel>
            <Form.Control name="coordinator" />
          </Form.Group>
          <Form.Group controlId="hour">
            <Divider>Expediente</Divider>
            <Form.ControlLabel>Entrada:</Form.ControlLabel>
            <Form.Control name="entry_time" type="time" />
            <DivHour>
              <DivPause>
                <Form.ControlLabel>Inicio Pausa:</Form.ControlLabel>
                <Form.Control name="lunch_entry_time" type="time" />
              </DivPause>
              <DivPause>
                <Form.ControlLabel>Termino Pausa:</Form.ControlLabel>
                <Form.Control name="lunch_out_time" type="time" />
              </DivPause>
            </DivHour>
            <Form.ControlLabel>Saída:</Form.ControlLabel>
            <Form.Control name="out_time" type="time" />
          </Form.Group>
          <Divider />
          <DivButton>
            <ButtonToolbar>
              <Button color="green" appearance="primary" type="submit">
                Salvar
              </Button>
              <Button color="red" appearance="primary">
                Cancelar
              </Button>
            </ButtonToolbar>
          </DivButton>
        </Form>
      </Panel>
    </>
  );
};

export default RegistrationUsers;
