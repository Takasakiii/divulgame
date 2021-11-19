import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { api, AnuncioOne } from "../api/api";
import { AxiosError } from "axios";

import FormComponent from "../components/Form";
import CenterTagComponent from "../components/CenterTag";
import InputTextComponent from "../components/InputText";
import TextAreaComponent from "../components/TextArea";
import SelectComponent from "../components/Select";

function AtualizarAnuncioPage() {
  const params = useParams();
  const navigate = useNavigate();
  const loggedUserData = useSelector((state: RootState) => state.login);

  const [anuncio, setAnuncio] = useState<AnuncioOne | null>(null);
  const [loading, setLoading] = useState(true);

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
      .get<AnuncioOne>(`/anuncios/${params.id}}`)
      .then((response) => {
        setLoading(false);
        setAnuncio(response.data);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.error(err.response?.data.error);
      });
  }, [params.id, navigate, loggedUserData]);

  if (loading) {
    return (
      <CenterTagComponent>
        <FormComponent className="mt-8">Carregando...</FormComponent>
      </CenterTagComponent>
    );
  }

  if (!loading && !anuncio) {
    return (
      <CenterTagComponent>
        <FormComponent className="mt-8">
          Problemas ao carregar os dados
        </FormComponent>
      </CenterTagComponent>
    );
  }

  return (
    <CenterTagComponent>
      <FormComponent className="mt-8">
        <InputTextComponent label="Titulo:" value={anuncio!.titulo} />
        <TextAreaComponent label="Descrição:" value={anuncio!.descricao} />
        <SelectComponent
          label="Tipo:"
          options={[
            { value: 0, label: "Produto" },
            { value: 1, label: "Serviço" },
          ]}
          selectedItem={anuncio!.tipo}
        />
      </FormComponent>
    </CenterTagComponent>
  );
}

export default AtualizarAnuncioPage;
