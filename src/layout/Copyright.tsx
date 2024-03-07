import React from "react";
import { Stack } from "rsuite";

const Copyright: React.FC = () => {
  return (
    <Stack
      className="copyright"
      justifyContent="center"
      style={{ height: 40, marginTop: 20 }}
    >
      <div className="container">
        <p>
          © 2024 -{" "}
          {/*  <a
            href="https://github.com/rsuite/rsuite"
            target="_blank"
            rel="noreferrer"
          > */}
          Conecto Sistemas
          {/* </a> */}
        </p>
      </div>
    </Stack>
  );
};

export default Copyright;
