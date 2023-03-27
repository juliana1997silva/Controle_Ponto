import styled from "styled-components";

export const Global = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #c9ecec, #00a6a6);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  .rs-input {
    height: 40px;
  }
`;

export const SpanInput = styled.span``;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 10%;
`;

export const TitleForm = styled.span`
  font-size: 18px;
`;

export const InputForm = styled.input`
  width: 250px;
  height: 45px;
  border-radius: 10px;
  background-color: #dcdcdc;
  border: 0px;
`;

export const Button = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #00a6a6;
  border: 0px;
  margin-top: 10%;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ImgPage = styled.img``;

export const DivImg = styled.div`
  text-align: center;
`;
