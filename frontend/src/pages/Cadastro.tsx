import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";

import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";
import InputTextComponent from "../components/InputText";
import SimpleButtonComponent from "../components/SimpleButton";
import ModalComponent from "../components/Modal";

import { UsuarioDto, api } from "../api/api";

function CadastroPage() {
  const navigation = useNavigate();

  const [modalState, setModalState] = useState({
    open: false,
    message: "",
    navigate: false,
  });

  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit() {
    const data: UsuarioDto = {
      nome,
      nomeSocial,
      email,
      username: usuario,
      senha,
    };

    api
      .post("/users", data)
      .then((_data) => {
        setModalState({
          open: true,
          message: "Cadastro realizado com sucesso!",
          navigate: true,
        });
      })
      .catch((e: AxiosError) => {
        setModalState({
          open: true,
          message: e.response?.data.error,
          navigate: false,
        });
      });
  }

  function handleModalClose(nextState: boolean) {
    setModalState({ open: nextState, message: "", navigate: false });
    if (modalState.navigate) {
      navigation("/");
    }
  }

  return (
    <>
      <CenterTagComponent>
        <FormComponent className="mt-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl">
            <b>Cadastro:</b>
          </h1>
          <InputTextComponent label="Nome Completo:" onChange={setNome} />
          <InputTextComponent label="Nome Social:" onChange={setNomeSocial} />
          <InputTextComponent label="Email:" onChange={setEmail} />
          <InputTextComponent label="Usuario:" onChange={setUsuario} />
          <InputTextComponent
            label="Senha:"
            type="password"
            className="mb-4"
            onChange={setSenha}
          />
          <CenterTagComponent>
            <SimpleButtonComponent type="submit">
              Cadastrar
            </SimpleButtonComponent>
          </CenterTagComponent>
        </FormComponent>
      </CenterTagComponent>
      <ModalComponent state={modalState.open} onClose={handleModalClose}>
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default CadastroPage;
