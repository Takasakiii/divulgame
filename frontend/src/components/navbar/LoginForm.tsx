import { useState } from "react";

import { api, Login, LoginResponse } from "../../api/api";
import { AxiosError } from "axios";

import { Link } from "react-router-dom";
import InputTextComponent from "../InputText";
import SimpleButtonComponent from "../SimpleButton";
import CenterTagComponent from "../CenterTag";
import FloatFormComponent from "./FloatForm";
import ModalComponent from "../Modal";

import { useDispatch } from "react-redux";
import { Login as LoginAction } from "../../store/Login/Login.actions";

export interface LoginFormComponentProps {
  onCloseForm?: () => void;
}

function LoginFormComponent(props: LoginFormComponentProps) {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    opened: false,
    message: "",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onLoginHandle() {
    const login: Login = {
      usuario: username,
      password: password,
    };

    api
      .post("/auth/", login)
      .then((response) => {
        const data = response.data as LoginResponse;
        dispatch(LoginAction(data));
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
      <FloatFormComponent onSubmit={onLoginHandle}>
        <InputTextComponent label="Login:" onChange={setUsername} />
        <InputTextComponent
          label="Senha:"
          type="password"
          className="mb-2"
          onChange={setPassword}
        />
        <CenterTagComponent>
          <SimpleButtonComponent className="w-min mb-2" type="submit">
            Entrar
          </SimpleButtonComponent>
          <Link
            to="/cadastro"
            className="text-blue-500"
            onClick={props.onCloseForm}
          >
            Cadastrar-se
          </Link>
        </CenterTagComponent>
      </FloatFormComponent>
      <ModalComponent onClose={onModalCloseHandle} state={modalState.opened}>
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default LoginFormComponent;
