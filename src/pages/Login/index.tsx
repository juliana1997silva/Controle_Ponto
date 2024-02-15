import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, InputGroup, Panel } from 'rsuite';
import logoTempus from '../../assets/logoTempus.png';
import { dataLogin, useAuth } from '../../hooks/hooksAuth';
import { Button, ContainerForm, DivImg, Global, ImgPage, TitleForm } from './styles';

const Login: React.FC = () => {
  const { showHome, signin, setUser } = useAuth();
  const [visible, setVisible] = useState(false);
  const [dataForm, setDataForm] = useState<dataLogin>({} as dataLogin);

  const handleChangePassword = () => {
    setVisible(!visible);
  };

  const handleChange = useCallback(
    (form: dataLogin) => {
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleSubmit = useCallback(() => {
    if (dataForm) signin(dataForm);
    //console.log(dataForm);
  }, [signin, dataForm]);

  if (showHome) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <Global>
      <Panel
        style={{
          backgroundColor: '#fff',
          width: '30%'
        }}
      >
        <DivImg>
          <ImgPage src={logoTempus} style={{ width: '40%', height: '50%' }} />
        </DivImg>
        <div style={{ padding: 20 }} />
        <ContainerForm>
          <Form onChange={handleChange}>
            <Form.Group>
              <TitleForm>Login:</TitleForm> <br /> <br />
              <InputGroup>
                <Form.Control name="email" />
                <span className="animation-bottom"></span>
              </InputGroup>
            </Form.Group>
            <br />
            <Form.Group>
              <TitleForm>Senha:</TitleForm> <br /> <br />
              <InputGroup>
                <Form.Control name="password" type={visible ? 'text' : 'password'} />

                <InputGroup.Button onClick={handleChangePassword}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
              </InputGroup>
            </Form.Group>
            <Button onClick={handleSubmit}>Entrar</Button>
          </Form>
        </ContainerForm>
      </Panel>
    </Global>
  );
};

export default Login;
