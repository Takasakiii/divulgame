import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";

import InputTextComponent from "../components/InputText";
import SimpleButtonComponent from "../components/SimpleButton";

function CadastroPage() {
  return (
    <CenterTagComponent>
      <FormComponent className="mt-10">
        <InputTextComponent label="Nome Completo:" />
        <InputTextComponent label="Nome Social:" />
        <InputTextComponent label="Usuario:" />
        <InputTextComponent label="Senha:" type="password" className="mb-4" />
        <CenterTagComponent>
          <SimpleButtonComponent type="submit">Cadastrar</SimpleButtonComponent>
        </CenterTagComponent>
      </FormComponent>
    </CenterTagComponent>
  );
}

export default CadastroPage;
