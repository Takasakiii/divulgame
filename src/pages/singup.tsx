import CenterScreenComponent from "../components/CenterScreen";
import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import FormButtonComponent from "../components/FormButton";
import CenterComponent from "../components/Center";

function SingUpPage() {
  return (
    <CenterScreenComponent>
      <FormComponent>
        <CenterComponent>
          <h1 className="text-2xl">Cadastro</h1>
        </CenterComponent>
        <InputTextComponent label="Nome Completo:" />
        <InputTextComponent label="Nome Social:" />
        <InputTextComponent label="Email:" />
        <InputTextComponent label="Usuario:" />
        <InputTextComponent label="Senha:" type="password" className="mb-2" />
        <CenterComponent>
          <FormButtonComponent label="Cadastrar" />
        </CenterComponent>
      </FormComponent>
    </CenterScreenComponent>
  );
}

export default SingUpPage;
