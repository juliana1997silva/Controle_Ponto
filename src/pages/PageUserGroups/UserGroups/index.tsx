import { Transfer } from 'antd';
import { TransferProps } from 'antd/lib/transfer';
import React, { useEffect, useState } from 'react';
import { Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useUserGroups } from '../hooks/hooksUserGroups';
import { TitlePage } from './styles';
import { useUsers } from '../../PageUsers/hooks/hooksUsers';

interface RecordType {
  key: string;
  title: string;
  team_id: string | null;
}

function UserGroups() {
  const { list, listGroups, groupsData, listUsersGroups, usersData } = useUserGroups();
  const [keySelect, setKeySelect] = useState('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const data: RecordType[] = Object.values(usersData || []).map((item) => {
    return {
      key: item.id,
      title: item.name,
      team_id: item.team_id
    };
  });
  const initialTargetKeys = data.filter((item) => item.team_id !== keySelect).map((item) => item.key);
  const selectGroups = Object.values(groupsData || []).map((item) => {
    return {
      value: item.id,
      label: item.name
    };
  });

  const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    if (targetKeys.length === 0) setTargetKeys(initialTargetKeys);
  }, [targetKeys, setTargetKeys, initialTargetKeys]);

  useEffect(() => {
    if (!list) listGroups();
    if (keySelect !== '') listUsersGroups(keySelect);
  }, [list, listGroups, keySelect, listUsersGroups, ]);

  return (
    <Panel header={<TitlePage className="title">Vincular Usuario X Grupo</TitlePage>}>
      <BreadcrumbComponent active="Vincular Usuario X Grupo" href="/dashboard" label="Dashboard" />
      <SelectPicker
        placeholder="Selecione o Grupo"
        style={{ width: 200 }}
        data={selectGroups}
        onSelect={(e) => setKeySelect(e)}
        onClean={() => setKeySelect('')}
      />
      <div style={{ padding: 10 }} />
      {keySelect !== '' && (
        <Transfer
          dataSource={data}
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
      )}
    </Panel>
  );
}

export default UserGroups;
