import React, { useCallback, useState } from "react";
import { Form } from "rsuite";
import logoConecto from "../../assets/logo.png";
import { Button, Container, Header, InputForm, TitleForm } from "./styles";

const Login: React.FC = () => {
  const [showRegistry, setShowRegistry] = useState(false);
  const handleSubmit = useCallback(() => {
    setShowRegistry(true);
  }, [setShowRegistry]);

  if (showRegistry) {
    window.location.pathname = "/home";
  }
  return (
    <>
      <Container>
        <Header>
          <img alt="Conecto Sistemas Ltda" src={logoConecto} />
        </Header>
        <Form style={{ textAlign: "center" }}>
          <Form.Group>
            <TitleForm>CPF:</TitleForm> <br />
            <InputForm name="cpf" />
          </Form.Group>
          <br />
          <Form.Group>
            <TitleForm>Senha:</TitleForm> <br />
            <InputForm name="password" />
          </Form.Group>
          <Button onClick={handleSubmit}>Entrar</Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
