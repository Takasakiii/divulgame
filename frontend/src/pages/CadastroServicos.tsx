import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { AnuncioDto, api, Anuncio } from "../api/api";
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
import FotosListaAddComponent from "../components/images-add/FotosListaAdd";
import FotosAddButtonComponent from "../components/images-add/FotosAddButton";
import FotoItemViewComponent from "../components/images-add/FotoItemView";

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
  const [fotos, setFotos] = useState<File[]>([]);

  useEffect(() => {
    if (!loggedUser || !loggedUser.user.isMei) {
      navigate("/");
    }
  }, [navigate, loggedUser]);

  if (loggedUser === null || !loggedUser.user.isMei) {
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
      .then((data) => {
        const { id: idAnuncio }: Anuncio = data.data;

        const formData = new FormData();
        fotos.forEach((foto) => {
          formData.append("fotos", foto);
        });

        return api.post(`/anuncios/${idAnuncio}/fotos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: loggedUser!.token,
          },
        });
      })
      .then(() => {
        setModalState({
          opened: true,
          message: "An??ncio cadastrado com sucesso!",
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

  function onAddFotos(newFotos: File[]) {
    setFotos(fotos.concat(newFotos));
  }

  return (
    <>
      <CenterTagComponent>
        <FormComponent className="mt-10" onSubmit={handleOnSave}>
          <h1 className="text-2xl">
            <b>Cadastrar Anuncio</b>
          </h1>
          <InputTextComponent label="Titulo:" onChange={setTitle} />
          <TextAreaComponent label="Descri????o:" onChange={setDescricao} />
          <SelectComponent
            label="Tipo:"
            options={[
              { value: 0, label: "Produto" },
              { value: 1, label: "Servi??o" },
            ]}
            onChange={setSelectedTipoAnuncio}
            selectedItem={selectedTipoAnuncio}
          />
          <FotosListaAddComponent label="Fotos:" className="mb-4">
            {fotos.map((foto, index) => (
              <FotoItemViewComponent key={index} foto={foto} />
            ))}
            <FotosAddButtonComponent onClick={onAddFotos} />
          </FotosListaAddComponent>
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
