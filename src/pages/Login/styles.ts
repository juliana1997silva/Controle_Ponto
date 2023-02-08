import styled from "styled-components";

export const Container = styled.div`
  width: 424px;
  height: 634px;
  box-shadow: 10px 5px 5px 5px #dcdcdc;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
`;

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
  background-color: #228b22;
  border: 0px;
  margin-top: 10%;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
