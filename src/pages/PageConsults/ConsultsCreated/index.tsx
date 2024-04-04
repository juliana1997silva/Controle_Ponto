import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form, Panel, SelectPicker } from 'rsuite';
import { useReleasePoint } from '../../PageRelease/hooks/hookReleasePoint';
import Consults from '../Consults';
import { TitlePage } from '../Consults/styles';
import { RequestDataForm, useConsults } from '../hooks/hooksConsults';

const ConsultsCreated: React.FC = () => {
  const { consultsPost, showListConsults} = useConsults();
  const { dataListUsers, listUsers, listHoursUsers } = useReleasePoint();
  const [requestData, setRequestData] = useState<RequestDataForm>({} as RequestDataForm);
  const [showList, setShowList] = useState(false);

  const dataSelect = Object.values(dataListUsers).map((item) => {
    return {
      role: item.name,
      value: item.user_interpres_code,
      label: item.name
    };
  });

  const handleChange = useCallback(
    (form: any) => {
      setRequestData({
        ...requestData,
        request_key: form.consults
      });
    },
    [requestData]
  );

  const handleSubmit = useCallback(async () => {
    consultsPost(requestData);
  }, [requestData, consultsPost]);

  useEffect(() => {
    listUsers();
    if (showListConsults) setShowList(true);
  }, [listUsers, showListConsults, setShowList]);

  if (showList) {
    return <Consults />;
  }
  return (
    <Panel header={<TitlePage className="title">Criar Consultas</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          paddingRight: 20
        }}
      >
        <ButtonToolbar>
          <Button appearance="primary" type="submit" style={{ backgroundColor: '#1976D2' }} onClick={handleSubmit}>
            Salvar
          </Button>

          <Button appearance="primary" onClick={() => setShowList(true)} style={{ backgroundColor: 'red', width: 120 }}>
            Voltar
          </Button>
        </ButtonToolbar>
      </div>

      <Form layout="vertical" onChange={handleChange}>
        <Form.Group>
          <Form.ControlLabel>Consulta</Form.ControlLabel>
          <Form.Control name="consults" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Usuário</Form.ControlLabel>
          <Form.Group>
            <div>
              <SelectPicker
                data={dataSelect}
                searchable={true}
                placeholder="Selecione o Colaborador"
                onSelect={(v, e) => {
                  listHoursUsers(v);
                  setRequestData({
                    ...requestData,
                    user_id: String(e.value)
                  });
                }}
                onClean={() => {
                  setRequestData({
                    ...requestData,
                    user_id: ''
                  });
                }}
              />
            </div>
          </Form.Group>
        </Form.Group>
      </Form>
    </Panel>
  );
};

export default ConsultsCreated;
