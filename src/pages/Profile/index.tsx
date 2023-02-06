import React, { useState } from "react";
import { Breadcrumb, Button, Form, Modal, Panel } from "rsuite";
import { Collaborator, ContainerHeader, PulaLinha, TitlePage } from "./styles";

const Profile: React.FC = () => {
  const [showModalPassword, setShowModalPassword] = useState(false);

  const dataProfile = {
    name: "Juliana Silva de Jesus",
    departamento: "Desenvolvimento",
    coordenador: "Wilson Felix",
    hour_expediente: "08:00 - 17:00",
    mail: "jjesus@conecto.com.br",
    phone: "(11) 92106-3113",
  };

  return (
    <>
      <Panel header={<TitlePage className="title">Perfil</TitlePage>}>
        <ContainerHeader
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Breadcrumb>
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Perfil</Breadcrumb.Item>
          </Breadcrumb>

          <Button
            appearance="primary"
            color="blue"
            onClick={() => setShowModalPassword(true)}
          >
            Alterar Senha
          </Button>
        </ContainerHeader>

        <Form formDefaultValue={dataProfile}>
          <Collaborator>Dados do Colaborador</Collaborator>
          <PulaLinha />
          <Form.Group controlId="name">
            <Form.ControlLabel>Nome Completo</Form.ControlLabel>
            <Form.Control name="name" disabled />
          </Form.Group>
          <Form.Group controlId="departamento" inlist={true}>
            <Form.ControlLabel>Departamento</Form.ControlLabel>
            <Form.Control name="departamento" disabled />
          </Form.Group>
          <Form.Group controlId="coordenador">
            <Form.ControlLabel>Coordenador</Form.ControlLabel>
            <Form.Control name="coordenador" disabled />
          </Form.Group>
          <Form.Group controlId="hour_expediente">
            <Form.ControlLabel>Horário Expediente</Form.ControlLabel>
            <Form.Control name="hour_expediente" disabled />
          </Form.Group>
          <Form.Group controlId="mail">
            <Form.ControlLabel>E-mail</Form.ControlLabel>
            <Form.Control name="mail" type="mail" disabled />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.ControlLabel>Telefone para Contato:</Form.ControlLabel>
            <Form.Control name="phone" type="phone" />
          </Form.Group>
        </Form>
      </Panel>

      {/* modal alteracao de senha*/}

      <Modal
        open={showModalPassword}
        onClose={() => setShowModalPassword(false)}
      >
        <Modal.Header>
          <Modal.Title>Alterar Senha de Acesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.ControlLabel>Senha Atual:</Form.ControlLabel>
              <Form.Control name="password_actual" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Nova Senha:</Form.ControlLabel>
              <Form.Control name="password_new" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Confirme a Nova Senha:</Form.ControlLabel>
              <Form.Control name="password_confirmation" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary">Ok</Button>
          <Button appearance="subtle">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
