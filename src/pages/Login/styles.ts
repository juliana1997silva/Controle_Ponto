import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    to right,
    var(--primary1),
    var(--white),
    var(--primary1)
  );

  @media (max-width: 1023px) {
    background: linear-gradient(
      to bottom,
      var(--primary1),
      var(--white) 50%,
      var(--primary1)
    );
  }
`;

export const LoginContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const ImageContainer = styled.div<{ image: string }>`
  flex: 6;
  height: 100%;

  padding: 20px;
  background-color: var(--white);
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  flex: 5;
  height: 100%;

  padding: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 520px) {
    padding: 20px;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  margin: 0px 0px;

  font-size: 22px;
  font-weight: 700;
  color: var(--primary1);
`;

export const WelcomeMessage = styled.p`
  margin: 26px 0px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray);
  text-align: center;
`;
