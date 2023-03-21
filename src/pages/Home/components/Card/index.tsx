import Icon from "@mdi/react";
import React from "react";
import { Container, ContainerGlobal } from "./styles";

interface DataCard {
  key: any;
  color: any;
  title?: string | any;
  subtitle?: string | any;
  icon?: any;
  graphic?: boolean;
}

const Card: React.FC<DataCard> = ({
  color,
  key,
  icon,
  title,
  subtitle,
  graphic,
}) => {
  const styles = {
    backgroundColor: color,
  };

  return (
    <ContainerGlobal>
      <Container style={styles} key={key}>
        <div
          style={{
            margin: 10,
            width: 50,
            height: 50,
            textAlign: "center",
            opacity: 0.5,
          }}
        >
          <Icon path={icon} />
        </div>

        <div
          style={{
            margin: 10,
            width: "70%",
            textAlign: "end",
          }}
        >
          <span style={{ fontSize: 60, margin: 0, padding: 0 }}>{title}</span>
          <br />
          <span>{subtitle}</span>
        </div>
      </Container>
    </ContainerGlobal>
  );
};

export default Card;
