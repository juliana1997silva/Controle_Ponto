import React, { useCallback } from "react";
import { Form } from "rsuite";
import logoConecto from "../../assets/logo.png";
import { dataLogin, useAuth } from "../../hooks/hooksAuth";
import { Button, Container, Header, TitleForm } from "./styles";

const Login: React.FC = () => {
  const { login, showRegistry, dataForm, setDataForm } = useAuth();

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

  if (showRegistry) {
    window.location.pathname = "/home";
  }
  return (
    <>
      <Container>
        <Header>
          <img alt="Conecto Sistemas Ltda" src={logoConecto} />
        </Header>
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
      </Container>
    </>
  );
};

export default Login;
