import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { api, AnuncioOne, AnuncioDto } from "../api/api";
import { AxiosError } from "axios";

import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";
import InputTextComponent from "../components/InputText";
import TextAreaComponent from "../components/TextArea";
import SelectComponent from "../components/Select";
import SimpleButtonComponent from "../components/SimpleButton";
import ModalComponent from "../components/Modal";
import AtualizarFotosButtonComponent from "../components/atualizar-fotos/AtualizarFotosButton";

function AtualizarAnuncioPage() {
  const params = useParams();
  const navigate = useNavigate();
  const loggedUserData = useSelector((state: RootState) => state.login);

  const [anuncio, setAnuncio] = useState<AnuncioOne | null>(null);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalState, setModalState] = useState({
    opened: false,
    message: "",
    navigate: false,
  });

  useEffect(() => {
    if (!params.id || isNaN(parseInt(params.id))) {
      navigate(-1);
      return;
    }

    if (!loggedUserData) {
      navigate(-1);
      return;
    }

    api
      .get<AnuncioOne>(`/anuncios/${params.id}`)
      .then((response) => {
        setLoading(false);
        setAnuncio(response.data);
        setTitulo(response.data.titulo);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.error(err.response?.data.error);
      });
  }, [params.id, navigate, loggedUserData]);

  function onUpdateAnuncio() {
    if (!anuncio || !loggedUserData) return;

    const anuncioDto: AnuncioDto = {
      descricao: anuncio.descricao,
      titulo: anuncio.titulo,
      tipoAnuncio: anuncio.tipo,
    };

    api
      .put(`/anuncios/${anuncio.id}`, anuncioDto, {
        headers: {
          Authorization: loggedUserData.token,
        },
      })
      .then(() => {
        setModalState({
          opened: true,
          message: "Anúncio atualizado com sucesso!",
          navigate: true,
        });
      })
      .catch((err: AxiosError) => {
        setModalState({
          opened: true,
          message: err.response?.data.error,
          navigate: false,
        });
      });
  }

  function onModalClose() {
    if (modalState.navigate) {
      navigate(-1);
      return;
    }

    setModalState({
      opened: false,
      message: "",
      navigate: false,
    });
  }

  if (loading) {
    return (
      <CenterTagComponent>
        <FormComponent className="mt-10">Carregando...</FormComponent>
      </CenterTagComponent>
    );
  }

  if (!loading && !anuncio) {
    return (
      <CenterTagComponent>
        <FormComponent className="mt-10">
          Problemas ao carregar os dados
        </FormComponent>
      </CenterTagComponent>
    );
  }

  return (
    <CenterTagComponent>
      <FormComponent className="mt-10" onSubmit={onUpdateAnuncio}>
        <h1 className="text-3xl">
          <b>Editar {titulo}</b>
        </h1>
        <InputTextComponent
          label="Titulo:"
          value={anuncio!.titulo}
          onChange={(titulo) => setAnuncio({ ...anuncio!, titulo })}
        />
        <TextAreaComponent
          label="Descrição:"
          value={anuncio!.descricao}
          onChange={(descricao) => setAnuncio({ ...anuncio!, descricao })}
        />
        <SelectComponent
          label="Tipo:"
          options={[
            { value: 0, label: "Produto" },
            { value: 1, label: "Serviço" },
          ]}
          selectedItem={anuncio!.tipo}
          className="mb-4"
          onChange={(tipo) => setAnuncio({ ...anuncio!, tipo })}
        />
        <CenterTagComponent>
          <AtualizarFotosButtonComponent
            className="mb-2"
            fotos={anuncio!.fotos}
            anuncioId={anuncio!.id}
          />
          <SimpleButtonComponent type="submit">Atualizar</SimpleButtonComponent>
        </CenterTagComponent>
      </FormComponent>
      <ModalComponent state={modalState.opened} onClose={onModalClose}>
        {modalState.message}
      </ModalComponent>
    </CenterTagComponent>
  );
}

export default AtualizarAnuncioPage;
