import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Button, ButtonToolbar, Form, Panel, SelectPicker } from 'rsuite';
import { useReleasePoint } from '../../PageRelease/hooks/hookReleasePoint';
import Consults from '../Consults';
import { TitlePage } from '../Consults/styles';
import api from '../../../services/api';

interface RequestDataForm {
  user_id?: string;
  request_key?: string;
}

const ConsultsCreated: React.FC = () => {
  const { dataListUsers, listUsers, listHoursUsers, } = useReleasePoint();
  const [showList, setShowList] = useState(false);
  const [requestData, setRequestData] = useState<RequestDataForm>({} as RequestDataForm);

  const autoCompleteData = Object.values(dataListUsers || []).map((item) => {
    return item.name;
  });

  const dataSelect = Object.values(dataListUsers).map((item) => {
    return {
      role: item.name,
      value: item.user_interpres_code,
      label: item.name
    };
  });

  const handleChange = useCallback(
    (form: any) => {
      console.log(form);
      setRequestData({
        ...requestData,
        request_key: form.consults
      });
    },
    [requestData]
  );

  const handleSubmit = useCallback(async () => {
    console.log('requestData::', requestData);

    const data = await api.post(`consult/${requestData.request_key}/${requestData.user_id}`);
    console.log('data::', data);
    setShowList(true)
  }, [requestData])

  useEffect(() => {
    listUsers();

  }, [listUsers]);


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
