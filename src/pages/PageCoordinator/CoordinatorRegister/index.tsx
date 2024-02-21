import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form, Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useGroups } from '../../PageGroups/hooks/hooksGroups';
import CoordinatorList from '../CoordinatorList';
import { CoordinatorData, useCoordinator } from '../hooks/hooksCoordinator';
import { DivButton, TitlePage } from './styles';

const CoordinatorRegister: React.FC = () => {
  const { mode, createdCoordinator, updateCoordinator, coordinatorStore } = useCoordinator();
  const { listGroups, list, dataGroups } = useGroups();
  const [formData, setFormData] = useState<CoordinatorData>({} as CoordinatorData);
  const [showList, setShowList] = useState(false);
  //const [group, setGroup] = useState('');

  const groups = Object.values(dataGroups).map((item) => {
    return {
      role: item.name,
      value: item.id,
      label: item.name
    };
  });

  const handleChange = useCallback(
    (form: CoordinatorData) => {
      // //console.log(form);
      setFormData(form);
    },
    [setFormData]
  );

  const handleSubmit = useCallback(() => {
    if (mode === 'create') {
      createdCoordinator(formData);
    } else {
      updateCoordinator(formData);
    }
    setShowList(true);
  }, [mode, formData, createdCoordinator, setShowList, updateCoordinator]);

  useEffect(() => {
    setFormData(coordinatorStore);

    if (!list) listGroups();
  }, [setFormData, coordinatorStore, listGroups, list]);

  if (showList) {
    return <CoordinatorList />;
  }

  return (
    <>
      <Panel header={<TitlePage className="title">Cadastro de Coordenadores</TitlePage>}>
        <BreadcrumbComponent active="Coordenadores > Cadastro" href="/dashboard" label="Dashboard" />
        <Form onChange={handleChange} formValue={formData}>
          <Form.ControlLabel>Nome:</Form.ControlLabel>
          <Form.Control name="name" />

          <Form.ControlLabel>Grupo:</Form.ControlLabel>
          <br />
          <Form.Control accepter={SelectPicker} name="group_id" data={groups} placeholder="Selecione o grupo" searchable={false} />
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

export default CoordinatorRegister;
