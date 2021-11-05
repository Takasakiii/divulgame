import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";
import CenterScreenComponent from "../components/CenterScreen";
import ModalComponent from "../components/Modal";

import Link from "next/link";

import axios from "axios";
import { useState } from "react";
import { LoginDto } from "../api/Login";

function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function onLogin() {
    const data: LoginDto = {
      username: usuario,
      senha: senha,
    };

    axios
      .post("/api/auth", data)
      .then((e) => console.log(e.data))
      .catch((e) => console.log(e));
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
      <ModalComponent isOpen={false} title="Login" onClose={() => {}}>
        Ola
      </ModalComponent>
    </>
  );
}

export default LoginPage;
