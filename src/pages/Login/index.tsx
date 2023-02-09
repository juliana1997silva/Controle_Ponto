import React, { useCallback } from "react";
import { Form, Header, Panel } from "rsuite";
import { dataLogin, useAuth } from "../../hooks/hooksAuth";
import HeaderTempus from "../../layout/Header";
import Home from "../Home";
import { Button, Container, TitleForm, TitlePage } from "./styles";

const Login: React.FC = () => {
  const { login, showHome, dataForm, setDataForm } = useAuth();

  const handleChange = useCallback(
    (form: dataLogin) => {
      console.log("handleChange => ", form);
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleSubmit = useCallback(() => {
    login(dataForm);
  }, [login, dataForm]);

  if (showHome) {
    return <Home />;
  }

  return (
    <>
      <Header>
        <HeaderTempus />
      </Header>
      <Container>
        <Panel header={<TitlePage>Tempus</TitlePage>}>
          <Form onChange={handleChange} style={{ textAlign: "center" }}>
            <Form.Group>
              <TitleForm>Login:</TitleForm> <br /> <br />
              <Form.Control name="login" />
            </Form.Group>
            <br />
            <Form.Group>
              <TitleForm>Senha:</TitleForm> <br /> <br />
              <Form.Control name="password" type="password" />
            </Form.Group>
            <Button onClick={handleSubmit}>Entrar</Button>
          </Form>
        </Panel>
      </Container>
    </>
  );
};

export default Login;
