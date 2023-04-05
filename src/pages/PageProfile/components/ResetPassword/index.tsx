import React from "react";
import { Button, Form, Modal } from "rsuite";
import { useProfile } from "../../hooks/hookProfile";

const ResetPassword: React.FC = () => {
  const { showModalPassword, setShowModalPassword } = useProfile();

  return (
    <Modal open={showModalPassword} onClose={() => setShowModalPassword(false)}>
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
        <Button
          appearance="primary"
          style={{
            marginInline: 10,
            width: 120,
            backgroundColor: "#00a6a6",
          }}
        >
          Alterar
        </Button>
        <Button appearance="subtle">Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassword;
