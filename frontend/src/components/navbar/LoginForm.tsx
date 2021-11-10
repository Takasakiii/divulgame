import { useState } from "react";

import InputTextComponent from "../InputText";
import SimpleButtonComponent from "../SimpleButton";
import CenterTagComponent from "../CenterTag";

function LoginFormComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onLoginHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(username, password);
  }

  return (
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
  );
}

export default LoginFormComponent;
