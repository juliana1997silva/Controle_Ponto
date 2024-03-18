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
  team_id: any;
}

function UserGroups() {
  const { list, listGroups, groupsData, listUsersGroups, usersData } = useUserGroups();

  const data: RecordType[] = Object.values(usersData || []).map((item) => {
    return {
      key: item.id,
      title: item.name,
      team_id: item.team_id
    };
  });

  const initialTargetKeys = data.map((item) => (item.team_id === null ? item.key : ''));
  
  const [keySelect, setKeySelect] = useState('');
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  console.log('dataListUsers::', usersData);

  const selectGroups = Object.values(groupsData || []).map((item) => {
    return {
      value: item.id,
      label: item.name
    };
  });

  const userList = Object.values(usersData || []).map((item) => {
    return {
      key: item.id,
      title: item.name
    };
  });

  console.log('targetKeys ::', targetKeys);
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

  const onScroll: TransferProps['onScroll'] = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  useEffect(() => {
    if (!list) listGroups();
    if (keySelect !== '') listUsersGroups(keySelect);
  }, [list, listGroups, keySelect, listUsersGroups]);

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
          titles={['Usuário', 'Grupo']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          onScroll={onScroll}
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
