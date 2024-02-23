import { Email, Lock, Login } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataLogin, useAuth } from '../../hooks/hooksAuth';
import Button from './components/Partials/Button';
import Form from './components/Partials/Form';
import loginImage from './images/login-image-2.jpg';
import { Container, FormContainer, ImageContainer, LoginContainer, Title, WelcomeMessage } from './styles';

const Signin: React.FC = () => {
  const { signin, user, loading } = useAuth();
  const navigate = useNavigate();

  // Methods
  const handleSubmit = useCallback(
    async (data: dataLogin) => {
      signin(data);
    },
    [signin]
  );

  useEffect(() => {
    if (user) {
      if (user.token) {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <Container>
      <Paper
        elevation={16}
        sx={{
          maxHeight: 'calc(100vh - 40px)',
          maxWidth: 1020,
          width: '92%',
          height: 620,
          display: 'flex',
          overflow: 'hidden'
        }}
      >
        <LoginContainer>
          <ImageContainer image={loginImage}></ImageContainer>

          <FormContainer>
            <Title>Conecto - Tempus</Title>

            <WelcomeMessage>Seja bem vindo!</WelcomeMessage>

            <Form
              onSubmit={handleSubmit}
              styles={{
                background: 'transparent',
                padding: '0px',
                gap: '14px'
              }}
              template="MUI"
              formGrid={{
                type: 'column',
                gap: 12,
                children: [
                  {
                    type: 'field',
                    content: {
                      name: 'email',
                      label: 'E-mail',
                      placeholder: 'Endereço de e-mail',
                      startAdornment: <Email color="primary" />,
                      validate: [{ required: 'É necessario endereço de e-mail.' }, { email: 'Endereço de e-mail inválido.' }]
                    }
                  },
                  {
                    type: 'field',
                    content: {
                      type: 'password',
                      name: 'password',
                      label: 'Senha',
                      placeholder: 'Digite sua senha',
                      startAdornment: <Lock color="primary" />,
                      validate: [
                        { required: 'É necessario a senha.' },
                        {
                          min: {
                            value: 8,
                            message: 'Senha precisa ter no mínimo 8 caracteres'
                          }
                        }
                      ]
                    }
                  }
                  /* {
                    type: 'checkbox',
                    content: {
                      name: 'remember',
                      label: 'Lembrar-me',
                      value: false
                    }
                  } */
                ]
              }}
              buttons={
                <>
                  <Button color="primary" type="submit" label="Entrar" endIcon={<Login />} loading={loading} />
                </>
              }
            />
          </FormContainer>
        </LoginContainer>
      </Paper>
    </Container>
  );
};

export default Signin;
