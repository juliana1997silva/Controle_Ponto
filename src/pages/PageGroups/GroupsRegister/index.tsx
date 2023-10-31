import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form, Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import GroupsList from '../GroupsList';
import { GroupsData, useGroups } from '../hooks/hooksGroups';
import { DivButton, TitlePage } from './styles';

const GroupsRegister: React.FC = () => {
  const { mode, createdGroup, groupStore, updateGroup } = useGroups();
  const [formData, setFormData] = useState<GroupsData>({} as GroupsData);
  const [showList, setShowList] = useState(false);

  const handleChange = useCallback(
    (form: GroupsData) => {
     // console.log(form);
      setFormData(form);
    },
    [setFormData]
  );

  const handleSubmit = useCallback(() => {
    if (mode === 'create') {
      createdGroup(formData);
    } else {
      updateGroup(formData);
    }
    setShowList(true);
  }, [mode, formData, createdGroup, setShowList, updateGroup]);

  useEffect(() => {
    setFormData(groupStore);
  }, [setFormData, groupStore]);

  if (showList) {
    return <GroupsList />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Cadastro de Grupos</TitlePage>}>
        <BreadcrumbComponent active="Grupos > Cadastro" href="/dashboard" label="Dashboard" />
        <Form onChange={handleChange} formValue={formData}>
          <Form.ControlLabel>Nome:</Form.ControlLabel>
          <Form.Control name="name" />
          <DivButton>
            <ButtonToolbar>
              <Button appearance="primary" type="submit" style={{ backgroundColor: '#00a6a6' }} onClick={handleSubmit}>
                Salvar
              </Button>
              <Button color="red" appearance="primary" onClick={() => setShowList(true)}>
                Cancelar
              </Button>
            </ButtonToolbar>
          </DivButton>
        </Form>
      </Panel>
    </>
  );
};

export default GroupsRegister;
