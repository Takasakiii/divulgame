import { useState } from "react";

import { api, Login, LoginResponse } from "../../api/api";
import { AxiosError } from "axios";

import InputTextComponent from "../InputText";
import SimpleButtonComponent from "../SimpleButton";
import CenterTagComponent from "../CenterTag";
import ModalComponent from "../Modal";

function LoginFormComponent() {
  const [modalState, setModalState] = useState({
    opened: false,
    message: "",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onLoginHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const login: Login = {
      usuario: username,
      password: password,
    };

    api
      .post("/auth/", login)
      .then((response) => {
        const data = response.data as LoginResponse;
      })
      .catch((error: AxiosError) => {
        setModalState({ opened: true, message: error.response?.data.error });
      });
  }

  function onModalCloseHandle(newState: boolean) {
    setModalState({ opened: newState, message: "" });
  }

  return (
    <>
      <form
        className="absolute p-4 top-12 bg-white rounded-md text-black right-0 w-max"
        onSubmit={onLoginHandle}
      >
        <InputTextComponent label="Login:" onChange={setUsername} />
        <InputTextComponent
          label="Senha:"
          type="password"
          className="mb-2"
          onChange={setPassword}
        />
        <CenterTagComponent>
          <SimpleButtonComponent type="submit">Entrar</SimpleButtonComponent>
        </CenterTagComponent>
      </form>
      <ModalComponent onClose={onModalCloseHandle} state={modalState.opened}>
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default LoginFormComponent;
