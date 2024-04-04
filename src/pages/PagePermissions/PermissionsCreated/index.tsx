import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Form, Input, Panel } from 'rsuite';
import PermissionsList from '../PermissionsList';
import { PermissionsData, usePermissions } from '../hooks/hooksPermission';
import { TitlePage } from '../styles';

//TEXTAREA
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" />);

const PermissionsCreated: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const { createdPermission } = usePermissions();
  const [dataForm, setDataForm] = useState<PermissionsData>({} as PermissionsData);
  const [image, setImage] = useState<File>({} as File);

  const handleChange = useCallback(
    (form: PermissionsData) => {
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleFileInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImage(file);
  };

  const handleSubmit = useCallback(() => {
    if (image.name === undefined) {
      console.log('sem imagem');
    } else {
      createdPermission(dataForm, image);
    }
  }, [createdPermission, dataForm, image]);

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
      <Form onChange={handleChange}>
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
        </Form.Group>
      </Form>
      <Button style={{ width: 120 }} appearance="primary" color="green" onClick={handleSubmit}>
        Salvar
      </Button>
    </Panel>
  );
};

export default PermissionsCreated;
