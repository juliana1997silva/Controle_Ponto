import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ef5921;
  height: 5%;
`;

export const ContainerAvatar = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 25px;
  text-align: center;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
  }
`;
