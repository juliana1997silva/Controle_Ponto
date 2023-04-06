import React, { useCallback, useState } from "react";
import {
  Button,
  Form,
  Loader,
  Message,
  Panel,
  Uploader,
  useToaster,
} from "rsuite";
import BreadcrumbComponent from "../../../components/Breadcrumb";
import ResetPassword from "../components/ResetPassword";
import { useProfile } from "../hooks/hookProfile";
import { ContainerHeader, PulaLinha, TitlePage } from "./styles";

import AvatarIcon from "@rsuite/icons/legacy/Avatar";

function previewFile(file: any, callback: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Profile: React.FC = () => {
  const { showModalPassword, setShowModalPassword } = useProfile();
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [buttonPhone, setButtonPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<"create" | "edit">("create");

  const dataProfile = {
    name: "Juliana Silva de Jesus",
    departamento: "Desenvolvimento",
    coordenador: "Wilson Felix",
    hour_expediente: "08:00 - 17:00",
    mail: "jjesus@conecto.com.br",
    phone: "(11) 92106-3113",
  };

  const handleChange = useCallback((value: any) => {
    const phoneFormat = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
    console.log(phoneFormat);
    setPhone(phoneFormat);
    setButtonPhone(true);
    setMode("edit");
  }, []);

  return (
    <>
      <Panel header={<TitlePage className="title">Perfil</TitlePage>}>
        <ContainerHeader
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <BreadcrumbComponent
            active="Perfil"
            hrefBack="/dashboard"
            label="Dashboard"
          />

          <Button
            appearance="primary"
            color="blue"
            onClick={() => setShowModalPassword(true)}
          >
            Alterar Senha
          </Button>
        </ContainerHeader>

        <Uploader
          fileListVisible={false}
          listType="picture"
          action="//jsonplaceholder.typicode.com/posts/"
          onUpload={(file) => {
            setUploading(true);
            previewFile(file.blobFile, (value: any) => {
              setFileInfo(value);
            });
          }}
          onSuccess={(response, file) => {
            setUploading(false);
            toaster.push(
              <Message type="success">Uploaded successfully</Message>
            );
            console.log(response);
          }}
          onError={() => {
            setFileInfo(null);
            setUploading(false);
            toaster.push(<Message type="error">Upload failed</Message>);
          }}
        >
          <button style={{ width: 150, height: 150 }}>
            {uploading && <Loader backdrop center />}
            {fileInfo ? (
              <img src={fileInfo} width="100%" height="100%" />
            ) : (
              <AvatarIcon style={{ fontSize: 80 }} />
            )}
          </button>
        </Uploader>

        <Form formDefaultValue={dataProfile}>
          <PulaLinha />
          <Form.Group controlId="name">
            <Form.ControlLabel>Nome Completo</Form.ControlLabel>
            <Form.Control name="name" disabled />
          </Form.Group>
          <Form.Group controlId="departamento" inlist={true}>
            <Form.ControlLabel>Departamento</Form.ControlLabel>
            <Form.Control name="departamento" disabled />
          </Form.Group>
          <Form.Group controlId="coordenador">
            <Form.ControlLabel>Coordenador</Form.ControlLabel>
            <Form.Control name="coordenador" disabled />
          </Form.Group>
          <Form.Group controlId="hour_expediente">
            <Form.ControlLabel>Horário Expediente</Form.ControlLabel>
            <Form.Control name="hour_expediente" disabled />
          </Form.Group>
          <Form.Group controlId="mail">
            <Form.ControlLabel>E-mail</Form.ControlLabel>
            <Form.Control name="mail" type="mail" disabled />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.ControlLabel>Telefone para Contato:</Form.ControlLabel>
            <Form.Control
              name="phone"
              type="phone"
              value={mode === "edit" ? phone : dataProfile.phone}
              onChange={(e) => handleChange(e)}
              maxLength={15}
            />

            {buttonPhone && (
              <Button
                appearance="primary"
                style={{
                  marginInline: 10,
                  width: 120,
                  backgroundColor: "#00a6a6",
                }}
              >
                Salvar
              </Button>
            )}
          </Form.Group>
        </Form>
      </Panel>

      {showModalPassword && (
        <>
          <ResetPassword />
        </>
      )}
    </>
  );
};

export default Profile;
