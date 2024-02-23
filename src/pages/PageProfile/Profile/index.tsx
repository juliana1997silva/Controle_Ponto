import React, { useCallback, useState } from 'react';
import { Button, Form, Loader, Message, Panel, Uploader, useToaster } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import ResetPassword from '../components/ResetPassword';
import { useProfile } from '../hooks/hookProfile';
import { Collaborator, ContainerHeader, PulaLinha, TitlePage } from './styles';

import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useAuth } from '../../../hooks/hooksAuth';

function previewFile(file: any, callback: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { showModalPassword, setShowModalPassword } = useProfile();
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  //const [buttonPhone, setButtonPhone] = useState(false);
  //const [phone, setPhone] = useState('');
  //const [mode, setMode] = useState<'create' | 'edit'>('create');


  // const handleChange = useCallback((value: any) => {
  //  const phoneFormat = value
  //    .replace(/\D/g, '')
  //    .replace(/(\d{2})(\d)/, '($1) $2')
  //    .replace(/(\d{5})(\d)/, '$1-$2')
  //    .replace(/(-\d{4})(\d+?)$/, '$1');
    // //console.log(phoneFormat);
  //  setPhone(phoneFormat);
   // setButtonPhone(true);
  //  setMode('edit');
 // }, []); 

  return (
    <>
      <Panel header={<TitlePage className="title">Perfil</TitlePage>}>
        <ContainerHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BreadcrumbComponent active="Perfil" href="/dashboard" label="Dashboard" />

          <Button appearance="primary" color="blue" onClick={() => setShowModalPassword(true)}>
            Alterar Senha
          </Button>
        </ContainerHeader>

        {/* <Uploader
          fileListVisible={false}
          listType="picture"
          action="//jsonplaceholder.typicode.com/posts/"
          onUpload={(file) => {
            setUploading(true);
            previewFile(file.blobFile, (value: any) => {
              setFileInfo(value);
            });
          }}
          onSuccess={(response, file) => {
            setUploading(false);
            toaster.push(<Message type="success">Uploaded successfully</Message>);
            // //console.log(response);
          }}
          onError={() => {
            setFileInfo(null);
            setUploading(false);
            toaster.push(<Message type="error">Upload failed</Message>);
          }}
        >
          <button style={{ width: 150, height: 150 }}>
            {uploading && <Loader backdrop center />}
            {fileInfo ? <img src={fileInfo} width="100%" height="100%" alt="Foto Perfil" /> : <AvatarIcon style={{ fontSize: 80 }} />}
          </button>
        </Uploader> */}

        <Form formDefaultValue={[user]}>
          <Collaborator>Dados do Colaborador</Collaborator>
          <PulaLinha />
          <Form.Group>
            <Form.ControlLabel>Nome Completo</Form.ControlLabel>
            <Form.Control name="name" disabled value={user.name} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Horário Expediente</Form.ControlLabel>
            <Form.Control
              name="hour_expediente"
              disabled
              value={`${user.entry_time} - ${user.lunch_entry_time} - ${user.lunch_out_time} - ${user.out_time}`}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>E-mail</Form.ControlLabel>
            <Form.Control name="email" type="email" disabled value={user.email} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Telefone para Contato:</Form.ControlLabel>
            <Form.Control name="phone" type="phone" disabled value={user.phone} />
          </Form.Group>
        </Form>
      </Panel>

      {showModalPassword && (
        <>
          <ResetPassword />
        </>
      )}
    </>
  );
};

export default Profile;
