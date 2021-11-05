import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";

function LoginPage() {
  function onLogin() {
    console.log("Login");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <FormComponent onSubmit={onLogin}>
        <InputTextComponent label="Usuario:" />
        <InputTextComponent label="Senha:" type="password" className="mb-2" />
        <div className="flex justify-center">
          <FormButtonComponent label="Entrar" />
        </div>
      </FormComponent>
    </div>
  );
}

export default LoginPage;
