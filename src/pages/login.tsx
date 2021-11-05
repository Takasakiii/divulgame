import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";
import CenterScreenComponent from "../components/CenterScreen";
import ModalComponent from "../components/Modal";

import Link from "next/link";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoginDto } from "../api/Login";

function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [modalState, setModalState] = useState({
    show: false,
    message: "",
    title: "",
  });

  function onLogin() {
    const data: LoginDto = {
      username: usuario,
      senha: senha,
    };

    axios
      .post("/api/auth", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      })
      .catch((e: AxiosError) => {
        setModalState({
          show: true,
          message: e.response?.data.error,
          title: "Erro",
        });
      });
  }

  function onCloseModalHandler() {
    setModalState({
      show: false,
      message: "",
      title: "",
    });
  }

  return (
    <>
      <CenterScreenComponent>
        <FormComponent onSubmit={onLogin}>
          <CenterComponent>
            <h1 className="text-2xl">Login</h1>
          </CenterComponent>
          <InputTextComponent label="Usuario:" onChange={setUsuario} />
          <InputTextComponent
            label="Senha:"
            type="password"
            className="mb-2"
            onChange={setSenha}
          />
          <CenterComponent>
            <FormButtonComponent label="Entrar" className="mb-2" />
            <Link href="/singup">
              <a className="text-blue-600">Cadastre-se</a>
            </Link>
          </CenterComponent>
        </FormComponent>
      </CenterScreenComponent>
      <ModalComponent
        isOpen={modalState.show}
        title={modalState.title}
        onClose={onCloseModalHandler}
      >
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default LoginPage;
