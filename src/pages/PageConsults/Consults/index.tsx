import VisibleIcon from '@rsuite/icons/Visible';
import { BsArrowClockwise } from 'react-icons/bs';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, IconButton, Input, Panel, SelectPicker, Table, Tooltip, Whisper } from 'rsuite';
import ConsultsCreated from '../ConsultsCreated';
import DrawerDetails from '../components/DrawerDetails';
import { ConsultsData, RequestDataForm, dataConsultsDetails, useConsults } from '../hooks/hooksConsults';
import { ContainerSearch, TitlePage } from './styles';

interface formSearch {
  consult?: number;
  team?: string;
  user?: string;
  customers?: string;
}

interface selectData {
  value: string;
  label: string;
  role: string;
}

const Consults: React.FC = () => {
  const { consultsData, consultsGet, list, consultsPut, consultsDetailsGet, setDataDetails } = useConsults();
  const { Column, HeaderCell, Cell } = Table;
  const [showCreated, setShowCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectTeam, setSelectTeam] = useState<selectData[]>([] as selectData[]);
  const [selectUser, setSelectUser] = useState<selectData[]>([] as selectData[]);
  const [selectCustomers, setSelectCustumers] = useState<selectData[]>([] as selectData[]);
  const [dataForm, setDataForm] = useState<formSearch>({} as formSearch);
  const [dataSend, setDataSend] = useState<RequestDataForm>({} as RequestDataForm);

  const dataTableConsults = Object.values(consultsData).filter((value) => {
    if (dataForm.consult) {
      return value.request_key.toString().includes(dataForm.consult.toString());
    } else if (dataForm.team && dataForm.user) {
      return value.team_id.includes(dataForm.team) && value.user.includes(dataForm.user);
    } else if (dataForm.team) {
      return value.team_id.includes(dataForm.team);
    } else if (dataForm.user) {
      return value.user.includes(dataForm.user);
    } else if (dataForm.customers) {
      return value.customer_name.includes(dataForm.customers);
    } else if (dataForm.customers && dataForm.team && dataForm.user) {
      return (
        value.customer_name.includes(dataForm.customers) && value.team_id.includes(dataForm.team) && value.user.includes(dataForm.user)
      );
    }
    
    return false;
  });

  const handleChange = useCallback(
    (form: formSearch) => {
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleView = useCallback(
    (data: ConsultsData) => {
      let dataRequest = {
        user_id: data.user_interpres_code,
        request_key: data.request_key
      };
      consultsDetailsGet(dataRequest);
      setShowDetails(true);
      setDataSend(dataRequest);
    },
    [consultsDetailsGet, setShowDetails, setDataSend]
  );

  useEffect(() => {
    const uniqueTeamIds: Set<string> = new Set();

    Object.values(consultsData).forEach((item) => {
      if (!uniqueTeamIds.has(item.team_id)) {
        uniqueTeamIds.add(item.team_id);
      }
    });

    const teams: selectData[] = Array.from(uniqueTeamIds).map((teamId) => ({
      value: teamId,
      label: teamId,
      role: teamId
    }));

    setSelectTeam(teams);

    const uniqueUserIds: Set<string> = new Set();

    Object.values(consultsData).forEach((item) => {
      if (!uniqueUserIds.has(item.user)) {
        uniqueUserIds.add(item.user);
      }
    });
    const users: selectData[] = Array.from(uniqueUserIds).map((userId) => ({
      value: userId,
      label: userId,
      role: userId
    }));

    setSelectUser(users);

    const uniqueCustomersIds: Set<string> = new Set();

    Object.values(consultsData).forEach((item) => {
      if (!uniqueCustomersIds.has(item.customer_name)) {
        uniqueCustomersIds.add(item.customer_name);
      }
    });
    const customers: selectData[] = Array.from(uniqueCustomersIds).map((customersId) => ({
      value: customersId,
      label: customersId,
      role: customersId
    }));

    setSelectCustumers(customers);
  }, [consultsData, setSelectTeam, setSelectUser, setSelectCustumers]);


  console.log('consultsData::', consultsData);

  useEffect(() => {
    if (!list) {
      consultsGet();
    }
  }, [list, consultsGet]);

  if (showCreated) {
    return <ConsultsCreated />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Consultas</TitlePage>}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button appearance="primary" onClick={() => setShowCreated(true)} style={{ backgroundColor: '#1976D2', width: 120 }}>
            Novo
          </Button>
        </div>
        <ContainerSearch>
          <Form layout="inline" onChange={handleChange}>
            <Form.Group>
              <Form.Control name="consult" accepter={Input} placeholder="Nº da consulta" />
            </Form.Group>
            <Form.Group>
              <Form.Control accepter={SelectPicker} name="team" placeholder="Selecione a equipe" data={selectTeam} />
            </Form.Group>
            <Form.Group>
              <Form.Control accepter={SelectPicker} name="user" placeholder="Selecione o usuario" data={selectUser} />
            </Form.Group>
            <Form.Group>
              <Form.Control accepter={SelectPicker} name="customers" placeholder="Selecione o cliente" data={selectCustomers} />
            </Form.Group>
          </Form>
          <Button startIcon={<BsArrowClockwise />} appearance="link" onClick={() => consultsPut()}>
            Atualizar tudo
          </Button>
        </ContainerSearch>
        <Table data={dataForm.consult || dataForm.team || dataForm.user ? dataTableConsults : consultsData} autoHeight>
          <Column width={100}>
            <HeaderCell>Consulta</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  <a href={rowData.link} target="_blank" rel="noopener noreferrer">
                    {rowData.request_key}
                  </a>
                </>
              )}
            </Cell>
          </Column>
          <Column width={130}>
            <HeaderCell>Cliente</HeaderCell>
            <Cell dataKey="customer_name" />
          </Column>
          <Column width={130}>
            <HeaderCell>Usuário</HeaderCell>
            <Cell dataKey="user" />
          </Column>
          <Column width={130}>
            <HeaderCell>Equipe</HeaderCell>
            <Cell dataKey="team_id" />
          </Column>
          <Column width={180}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="situation" />
          </Column>
          <Column width={100} align="center">
            <HeaderCell>Documentação</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.documentation === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>Revisão</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.revision === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={80} align="center">
            <HeaderCell>BUG</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.bug === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={80} align="center">
            <HeaderCell>Diário</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.daily === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={80} align="center">
            <HeaderCell>Atualização</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.update === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={160} align="center">
            <HeaderCell>Previsão de Atendimento</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.service_forecast === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column>
            <HeaderCell>Commit</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.commit === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <ButtonGroup>
                  <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Visualizar Detalhes</Tooltip>}>
                    <IconButton icon={<VisibleIcon />} onClick={() => handleView(rowData)} style={{ color: '#000' }} />
                  </Whisper>
                </ButtonGroup>
              )}
            </Cell>
          </Column>
        </Table>
      </Panel>
      {showDetails && dataSend.request_key && (
        <DrawerDetails
          open={showDetails}
          onClose={() => setShowDetails(false)}
          onClickCancel={() => {
            setShowDetails(false);
            setDataDetails({} as dataConsultsDetails);
          }}
          request_key={dataSend.request_key}
        />
      )}
    </>
  );
};

export default Consults;
