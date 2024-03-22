import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Input, Panel } from 'rsuite';
import PermissionsList from '../PermissionsList';
import { TitlePage } from '../styles';

//TEXTAREA
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" />);

const PermissionsCreated: React.FC = () => {
  const [showList, setShowList] = useState(false);

  const handleFileInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log('file ', file);
  };

  if (showList) {
    return <PermissionsList />;
  }
  return (
    <Panel header={<TitlePage className="title">Criar Permissões</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Button appearance="primary" onClick={() => setShowList(true)} style={{ width: 120 }} color="red">
          Voltar
        </Button>
      </div>
      <Form>
        <Form.Group>
          <Form.ControlLabel>Nome</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Descrição</Form.ControlLabel>
          <Form.Control name="description" accepter={Textarea} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Imagem</Form.ControlLabel>
          <input
            name="image"
            type="file"
            onChange={(e) => {
              handleFileInput(e);
            }}
          />
          <br /> <br />
          {/* {image.name === undefined ? (
            listPermissionData.image !== null ? (
              <ImageAcesso
                src={`${process && process.env.REACT_APP_URL_API}${routesEndpoints.SEARCH_IMAGE}${listPermissionData.image}`}
                width={200}
              />
            ) : (
              <ImageAcesso />
            )
          ) : (
            <ImageAcesso src={URL.createObjectURL(image)} />
          )} */}
        </Form.Group>
      </Form>
      <Button style={{ width: 120 }} appearance="primary" color="green">
        Salvar
      </Button>
    </Panel>
  );
};

export default PermissionsCreated;
