import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";
import CenterScreenComponent from "../components/CenterScreen";

import Link from "next/link";

function LoginPage() {
  function onLogin() {
    console.log("Login");
  }

  return (
    <CenterScreenComponent>
      <FormComponent onSubmit={onLogin}>
        <CenterComponent>
          <h1 className="text-2xl">Login</h1>
        </CenterComponent>
        <InputTextComponent label="Usuario:" />
        <InputTextComponent label="Senha:" type="password" className="mb-2" />
        <CenterComponent>
          <FormButtonComponent label="Entrar" className="mb-2" />
          <Link href="/singup">
            <a className="text-blue-600">Cadastre-se</a>
          </Link>
        </CenterComponent>
      </FormComponent>
    </CenterScreenComponent>
  );
}

export default LoginPage;
