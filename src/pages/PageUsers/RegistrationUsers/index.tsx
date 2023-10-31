import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, ButtonToolbar, Divider, Form, InputGroup, Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import api from '../../../services/api';
import UserList from '../UserList';
import { UsersData, useUsers } from '../hooks/hooksUsers';
import { DivButton, DivHour, DivPause, TitlePage } from './styles';

interface dataGroups {
  id?: string;
  name?: string;
  level?: string;
}

const RegistrationUsers: React.FC = () => {
  const { RegisterUsers, formDataUser, setShowUsersList, showUsersList, mode, updateUsers, setFormDataUser } = useUsers();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<UsersData>({} as UsersData);
  const [groups, setGroups] = useState<dataGroups[]>({} as dataGroups[]);

  const handleChangePassword = () => {
    setVisible(!visible);
  };

  const dataGroupList = Object.values(groups).map((item) => {
    return {
      value: item.id,
      label: item.name
    };
  });

  const listGroups = useCallback(() => {
    api
      .get('/group')
      .then((response) => {
        console.log(response.data);
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
  }, [setGroups]);

  const handleChange = useCallback(
    (form: UsersData) => {
      console.log(form);
      setFormData(form);
    },
    [setFormData]
  );

  const handleSubmit = useCallback(() => {
    if (mode === 'create') {
      RegisterUsers(formData);
    } else {
      updateUsers(formData);
    }
    setFormData({
      entry_time: '',
      lunch_entry_time: '',
      lunch_out_time: '',
      name: '',
      out_time: '',
      password: '',
      phone: '',
      email: ''
    });
  }, [RegisterUsers, formData, setFormData]);

  useLayoutEffect(() => {
    if (groups.length === undefined) listGroups();
    setFormData(formDataUser);
  });

  if (showUsersList) {
    return <UserList />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Cadastro de Usuarios</TitlePage>}>
        <BreadcrumbComponent active="Usuarios > Cadastro" href="/dashboard" label="Dashboard" />
        <Form onChange={handleChange} formValue={formDataUser}>
          <Form.ControlLabel>Nome:</Form.ControlLabel>
          <Form.Control name="name" />

          <Form.ControlLabel>Telefone:</Form.ControlLabel>
          <Form.Control name="phone" />

          <Form.ControlLabel>E-mail:</Form.ControlLabel>
          <Form.Control name="email" />

          <Form.Group controlId="group">
            <Form.ControlLabel>Grupo:</Form.ControlLabel>
            <Form.Control
              name="group_id"
              accepter={SelectPicker}
              data={dataGroupList}
              searchable={false}
              placeholder="Selecione o Grupo"
              defaultValue={formDataUser.group_id}
            />
          </Form.Group>
          {formData.group_id && (
            <Form.Group controlId="coordinator">
              <Form.ControlLabel>Coordenador:</Form.ControlLabel>
              <Form.Control
                name="coordinator_id"
                accepter={SelectPicker}
                data={dataGroupList}
                searchable={false}
                placeholder="Selecione o Grupo"
                //defaultValue={formData.group_id}
              />
            </Form.Group>
          )}

          <Form.Group>
            <Divider>Expediente</Divider>
            <Form.ControlLabel>Entrada:</Form.ControlLabel>
            <Form.Control name="entry_time" type="time" defaultValue={formData.entry_time} />
            <DivHour>
              <DivPause>
                <Form.ControlLabel>Inicio Pausa:</Form.ControlLabel>
                <Form.Control name="lunch_entry_time" type="time" defaultValue={formData.lunch_entry_time} />
              </DivPause>
              <DivPause>
                <Form.ControlLabel>Termino Pausa:</Form.ControlLabel>
                <Form.Control name="lunch_out_time" type="time" defaultValue={formData.lunch_out_time} />
              </DivPause>
            </DivHour>
            <Form.ControlLabel>Saída:</Form.ControlLabel>
            <Form.Control name="out_time" type="time" defaultValue={formData.out_time} />
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
              <Button appearance="primary" type="submit" style={{ backgroundColor: '#00a6a6' }} onClick={handleSubmit}>
                Salvar
              </Button>
              <Button
                color="red"
                appearance="primary"
                onClick={() => {
                  setFormData({} as UsersData);
                  setFormDataUser({} as UsersData);
                  setShowUsersList(true);
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
