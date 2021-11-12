import { useState } from "react";
import { useNavigate } from "react-router";

import { AnuncioDto, api } from "../api/api";
import { AxiosError } from "axios";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";
import InputTextComponent from "../components/InputText";
import TextAreaComponent from "../components/TextArea";
import SelectComponent from "../components/Select";
import SimpleButtonComponent from "../components/SimpleButton";
import ModalComponent from "../components/Modal";

function CadastroServicosPage() {
  const loggedUser = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    opened: false,
    message: "",
    navigate: false,
  });

  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedTipoAnuncio, setSelectedTipoAnuncio] = useState(0);

  if (loggedUser === null || !loggedUser.user.isMei) {
    navigate("/");
    return <></>;
  }

  function handleOnSave() {
    const data: AnuncioDto = {
      titulo: title,
      descricao: descricao,
      tipoAnuncio: selectedTipoAnuncio,
    };

    api
      .post("/anuncios", data, {
        headers: {
          Authorization: loggedUser!.token,
        },
      })
      .then(() => {
        setModalState({
          opened: true,
          message: "Anúncio cadastrado com sucesso!",
          navigate: true,
        });
      })
      .catch((e: AxiosError) => {
        setModalState({
          opened: true,
          message: e.response?.data.error,
          navigate: false,
        });
      });
  }

  function onModalClose(newState: boolean) {
    if (modalState.navigate) {
      navigate("/");
      return;
    }

    setModalState({
      opened: newState,
      message: "",
      navigate: false,
    });
  }

  return (
    <>
      <CenterTagComponent>
        <FormComponent className="mt-10" onSubmit={handleOnSave}>
          <h1 className="text-2xl">
            <b>Cadastrar Anuncio</b>
          </h1>
          <InputTextComponent label="Titulo:" onChange={setTitle} />
          <TextAreaComponent label="Descrição:" onChange={setDescricao} />
          <SelectComponent
            label="Tipo:"
            options={[
              { value: 0, label: "Produto" },
              { value: 1, label: "Serviço" },
            ]}
            onChange={setSelectedTipoAnuncio}
            selectedItem={selectedTipoAnuncio}
            className="mb-4"
          />
          <CenterTagComponent>
            <SimpleButtonComponent type="submit">Salvar</SimpleButtonComponent>
          </CenterTagComponent>
        </FormComponent>
      </CenterTagComponent>
      <ModalComponent onClose={onModalClose} state={modalState.opened}>
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default CadastroServicosPage;
