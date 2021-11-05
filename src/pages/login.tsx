import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";

function LoginPage() {
  function onLogin() {
    console.log("Login");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <FormComponent onSubmit={onLogin}>
        <CenterComponent>
          <h1 className="text-2xl">Login</h1>
        </CenterComponent>
        <InputTextComponent label="Usuario:" />
        <InputTextComponent label="Senha:" type="password" className="mb-2" />
        <CenterComponent>
          <FormButtonComponent label="Entrar" />
        </CenterComponent>
      </FormComponent>
    </div>
  );
}

export default LoginPage;
