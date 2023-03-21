import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(to right, #fff, #00a6a6);
  height: 5%;
`;

export const ContainerAvatar = styled.div`
  height: 50px;
  margin: 10px;
  border-radius: 25px;
  text-align: center;
  display: flex;
  flex-direction: row;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
  }
`;

export const NameUser = styled.span`
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  margin-right: 20px;
  margin-top: 5%;
`;
