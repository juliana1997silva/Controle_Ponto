import React, { useCallback } from "react";
import { Navigate } from "react-router";
import { Form, Panel } from "rsuite";
import logoConecto from "../../assets/logo.png";
import { dataLogin, useAuth } from "../../hooks/hooksAuth";
import { Button, DivImg, ImgPage, TitleForm } from "./styles";

const Login: React.FC = () => {
  const { login, dataForm, setDataForm, showHome, user } = useAuth();

  const handleChange = useCallback(
    (form: dataLogin) => {
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleSubmit = useCallback(() => {
    login(dataForm);
  }, [login, dataForm]);

  if (showHome && user.logged) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <Panel>
        <DivImg>
          <ImgPage src={logoConecto} />
        </DivImg>

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
    </>
  );
};

export default Login;
