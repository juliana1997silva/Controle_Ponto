import { Transfer } from 'antd';
import { TransferProps } from 'antd/lib/transfer';
import { useCallback, useEffect, useState } from 'react';
import { Button, Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useUserGroups } from '../hooks/hooksUserGroups';
import { TitlePage } from './styles';

interface RecordType {
  key: string;
  title: string;
  team_id: string | null;
}

function UserGroups() {
  const { list, listGroups, groupsData, listUsersGroups, usersData, connectUser, setKeySelect, keySelect, setUsersData } = useUserGroups();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [updatetarget, setUpdateTarget] = useState(false);
  const dataSource: RecordType[] = Object.values(usersData || []).map((item) => {
    return {
      key: item.id,
      title: item.name,
      team_id: item.team_id
    };
  });

  // Efeito para inicializar targetKeys com initialTargetKeys quando keySelect muda
  useEffect(() => {
    if (keySelect !== '' && !updatetarget) {
      const initialTargetKeys = dataSource.filter((item) => item.team_id !== keySelect).map((item) => item.key);
      setTargetKeys(initialTargetKeys);
    }
  }, [keySelect, dataSource, updatetarget]);

  const selectGroups = Object.values(groupsData || []).map((item) => {
    return {
      value: item.id,
      label: item.name
    };
  });

  //PEGAR O ARRAY COMPLETO DOS USUARIOS QUE ESTÃO NO GRUPO SELECIONADO
  const exemplo = [];
  exemplo.push(dataSource.filter((item) => !targetKeys.includes(item.key)).map((item) => item.key));
  const flattenedExemplo = exemplo.reduce((acc, val) => acc.concat(val), []);

  const onChange: TransferProps['onChange'] = useCallback(
    (nextTargetKeys: any, direction: any, moveKeys: any) => {
      setTargetKeys(nextTargetKeys);
      setUpdateTarget(true);
    },
    [setTargetKeys, setUpdateTarget]
  );

  const onSelectChange = useCallback(
    (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
      setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
      setUpdateTarget(true);
    },
    [setSelectedKeys, setUpdateTarget]
  );

  const handleSubmit = useCallback(() => {
    connectUser(keySelect, flattenedExemplo);
    setUsersData([]);
    setKeySelect('');
  }, [flattenedExemplo, connectUser, keySelect, setUsersData, setKeySelect]);

  useEffect(() => {
    if (!list) listGroups();
  }, [list, listGroups]);

  return (
    <Panel header={<TitlePage className="title">Vincular Usuario X Grupo</TitlePage>}>
      <BreadcrumbComponent active="Vincular Usuario X Grupo" href="/dashboard" label="Dashboard" />
      <SelectPicker
        placeholder="Selecione o Grupo"
        style={{ width: 200 }}
        data={selectGroups}
        onSelect={(e) => {
          setKeySelect(e);
          listUsersGroups(e);
        }}
        onClean={() => {
          setKeySelect('');
          setUsersData([]);
        }}
      />
      <div style={{ padding: 10 }} />
      {keySelect !== '' && (
        <>
          <Transfer
            dataSource={dataSource}
            titles={['Usuarios do Grupo', 'Outros Usuarios']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item: any) => item.title}
            listStyle={{
              width: '40%',
              height: 350
            }}
          />
          <div style={{ padding: 15 }} />
          <Button appearance="primary" color="green" onClick={handleSubmit}>
            Associar
          </Button>
        </>
      )}
    </Panel>
  );
}

export default UserGroups;
