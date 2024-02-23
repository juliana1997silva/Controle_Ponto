import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'rsuite';
import { dataPassword, useProfile } from '../../hooks/hookProfile';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

const ResetPassword: React.FC = () => {
  const { showModalPassword, setShowModalPassword, forgoutPassword } = useProfile();
  const [visible, setVisible] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirmation, setVisibleConfirmation] = useState(false);
  const [dataform, setDataForm] = useState<dataPassword>({} as dataPassword);

  const handleChangePassword = () => {
    setVisible(!visible);
  };
  const handleChangePasswordNew = () => {
    setVisibleNew(!visibleNew);
  };
  const handleChangePasswordConfirmation = () => {
    setVisibleConfirmation(!visibleConfirmation);
  };

  const handleChange = useCallback(
    (form: dataPassword) => {
      console.log('form::', form);
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleSubmit = useCallback(() => {
    forgoutPassword(dataform);
  }, [forgoutPassword, dataform]);

  return (
    <Modal open={showModalPassword} onClose={() => setShowModalPassword(false)}>
      <Modal.Header>
        <Modal.Title>Alterar Senha de Acesso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onChange={handleChange}>
          <Form.Group>
            <Form.ControlLabel>Senha Atual:</Form.ControlLabel>
            <InputGroup>
              <Form.Control name="password" type={visible ? 'text' : 'password'} />
              <InputGroup.Button onClick={handleChangePassword}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Nova Senha:</Form.ControlLabel>
            <InputGroup>
              <Form.Control name="new_password" type={visibleNew ? 'text' : 'password'} />
              <InputGroup.Button onClick={handleChangePasswordNew}>{visibleNew ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Confirme a Nova Senha:</Form.ControlLabel>
            <InputGroup>
              <Form.Control name="confirmation_password" type={visibleConfirmation ? 'text' : 'password'} />
              <InputGroup.Button onClick={handleChangePasswordConfirmation}>{visibleConfirmation ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          appearance="primary"
          style={{
            marginInline: 10,
            width: 120,
            backgroundColor: '#1976D2'
          }}
          onClick={handleSubmit}
        >
          Alterar
        </Button>
        <Button appearance="subtle" onClick={() => setShowModalPassword(false)}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassword;
