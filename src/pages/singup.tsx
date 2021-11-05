import CenterScreenComponent from "../components/CenterScreen";
import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";
import ModalComponent from "../components/Modal";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { LoginDto } from "../api/Login";
import { useRouter } from "next/router";

function SingUpPage() {
  const router = useRouter();

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [username, setUsername] = useState("");

  function singUpHandler() {
    const loginData: LoginDto = {
      nome: name,
      nomeSocial,
      email,
      senha: password,
      username,
    };

    axios
      .post("/api/users", loginData)
      .then(() => {
        setModalState({
          isOpen: true,
          content: "Cadastro Realizado com Sucesso!",
          title: "Sucesso",
        });
      })
      .catch((err: AxiosError) => {
        setModalState({
          isOpen: true,
          title: "Problemas ao cadastrar",
          content: err.response?.data?.error,
        });
      });
  }

  function handleCloseModal() {
    if (modalState.title === "Sucesso") {
      router.push("/login");
    }

    setModalState({ isOpen: false, title: "", content: "" });
  }

  return (
    <>
      <CenterScreenComponent>
        <FormComponent onSubmit={singUpHandler}>
          <CenterComponent>
            <h1 className="text-2xl">Cadastro</h1>
          </CenterComponent>
          <InputTextComponent label="Nome Completo:" onChange={setName} />
          <InputTextComponent label="Nome Social:" onChange={setNomeSocial} />
          <InputTextComponent label="Email:" onChange={setEmail} />
          <InputTextComponent label="Usuario:" onChange={setUsername} />
          <InputTextComponent
            label="Senha:"
            type="password"
            className="mb-2"
            onChange={setPassword}
          />
          <CenterComponent>
            <FormButtonComponent label="Cadastrar" />
          </CenterComponent>
        </FormComponent>
      </CenterScreenComponent>
      <ModalComponent
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
      >
        {modalState.content}
      </ModalComponent>
    </>
  );
}

export default SingUpPage;
