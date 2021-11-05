import CenterScreenComponent from "../components/CenterScreen";
import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";

import axios from "axios";
import { useState } from "react";
import { LoginDto } from "../api/Login";

function SingUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [username, setUsername] = useState("");

  async function singUpHandler() {
    const loginData: LoginDto = {
      nome: name,
      nomeSocial,
      email,
      senha: password,
      username,
    };

    try {
      await axios.post("/api/users", loginData);
    } catch (error) {
      console.log(error.);
    }
  }

  return (
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
  );
}

export default SingUpPage;
