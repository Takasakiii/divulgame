import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";
import InputTextComponent from "../components/InputText";
import TextAreaComponent from "../components/TextArea";
import SelectComponent from "../components/Select";

function CadastroServicosPage() {
  return (
    <CenterTagComponent>
      <FormComponent className="mt-10">
        <h1 className="text-2xl">
          <b>Cadastrar Anuncio</b>
        </h1>
        <InputTextComponent label="Titulo" />
        <TextAreaComponent label="Descrição:" />
        <SelectComponent
          label="Tipo:"
          options={[{ label: "foda", value: "foda" }]}
        />
      </FormComponent>
    </CenterTagComponent>
  );
}

export default CadastroServicosPage;
