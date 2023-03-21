import React, { useCallback } from "react";
import { Navigate } from "react-router";
import { Form, Panel } from "rsuite";
import logoTempus from "../../assets/logoTempus.png";
import { dataLogin, useAuth } from "../../hooks/hooksAuth";
import { Button, DivImg, Global, ImgPage, TitleForm } from "./styles";

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
    <Global>
      <Panel
        style={{
          backgroundColor: "#fff",
          width: "30%",
        }}
      >
        <DivImg>
          <ImgPage src={logoTempus} style={{ width: "40%", height: "50%" }} />
        </DivImg>
        <div style={{ padding: 20 }} />
        <Form onChange={handleChange} style={{ textAlign: "center" }}>
          <Form.Group>
            <TitleForm>Login:</TitleForm> <br /> <br />
            <Form.Control
              name="login"
              style={{ borderColor: "#a39999", height: 40, width: "100%" }}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <TitleForm>Senha:</TitleForm> <br /> <br />
            <Form.Control
              name="password"
              type="password"
              style={{ borderColor: "#a39999", height: 40, width: "100%" }}
            />
          </Form.Group>
          <Button onClick={handleSubmit}>Entrar</Button>
        </Form>
      </Panel>
    </Global>
  );
};

export default Login;
