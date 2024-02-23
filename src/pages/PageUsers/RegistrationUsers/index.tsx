import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Divider, Form, InputGroup, Panel, SelectPicker, Toggle } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import UserList from '../UserList';
import { UsersData, useUsers } from '../hooks/hooksUsers';
import { DivButton, DivHour, DivPause, TitlePage } from './styles';

const RegistrationUsers: React.FC = () => {
  const {
    RegisterUsers,
    formDataUser,
    mode,
    updateUsers,
    setFormDataUser,
    showRegister,
    setShowRegister,
    listCoordinatorData,
    listCoordinator,
    coordinatorData
  } = useUsers();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<UsersData>({} as UsersData);
  const [listUser, setListUser] = useState(false);

  const handleChangePassword = () => {
    setVisible(!visible);
  };

  const handleChange = useCallback(
    (form: UsersData) => {
      //console.log(form);
      setFormData(form);
    },
    [setFormData]
  );

  const coordinator = Object.values(coordinatorData).map((item) => {
    return {
      value: item.id,
      label: item.name,
      role: item.name
    };
  });

  const handleSubmit = useCallback(() => {
    if (mode === 'create') {
      RegisterUsers(formData);
    } else {
      updateUsers(formData);
    }
    setListUser(true);
    setShowRegister(!showRegister);
  }, [RegisterUsers, formData, updateUsers, mode, setListUser, setShowRegister, showRegister]);

  useEffect(() => {
    setFormData(formDataUser);
    if (!listCoordinatorData) listCoordinator();
  }, [setFormData, formDataUser, listCoordinatorData, listCoordinator]);

  if (listUser) {
    return <UserList />;
  }

  return (
    <>
      <Panel header={<TitlePage className="title">Cadastro de Usuarios</TitlePage>}>
        <BreadcrumbComponent active="Usuarios > Cadastro" href="/dashboard" label="Dashboard" />
        <Form onChange={handleChange} formValue={formData}>
          <Form.ControlLabel>Nome:</Form.ControlLabel>
          <Form.Control name="name" />

          <Form.ControlLabel>Telefone:</Form.ControlLabel>
          <Form.Control name="phone" />

          <Form.ControlLabel>E-mail:</Form.ControlLabel>
          <Form.Control name="email" />

          <Form.Group controlId="coordinator">
            <Form.ControlLabel>Coordenador:</Form.ControlLabel>
            <Form.Control
              name="group_id"
              accepter={SelectPicker}
              data={coordinator}
              searchable={false}
              placeholder="Selecione o Coordenador"
            />
          </Form.Group>
          <Form.Group controlId="admin">
            Admin: <Form.Control name="admin" accepter={Toggle} />
          </Form.Group>
          <Form.Group controlId="admin">
            Coordenador: <Form.Control name="manager" accepter={Toggle} />
          </Form.Group>
          <Form.Group>
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
          <Form.Group>
            <Divider>Dados de Acesso</Divider>
            <Form.Group>
              <Form.ControlLabel>Senha:</Form.ControlLabel>
              <InputGroup>
                <Form.Control name="password" type={visible ? 'text' : 'password'} />
                <InputGroup.Button onClick={handleChangePassword}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
              </InputGroup>
            </Form.Group>
          </Form.Group>
          <Divider />
          <DivButton>
            <ButtonToolbar>
              <Button appearance="primary" type="submit" style={{ backgroundColor: '#1976D2' }} onClick={handleSubmit}>
                Salvar
              </Button>
              <Button
                color="red"
                appearance="primary"
                onClick={() => {
                  //console.log('cancelar');
                  setListUser(true);
                  setShowRegister(!showRegister);
                  setFormDataUser({} as UsersData);
                  setFormData({} as UsersData);
                }}
              >
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
