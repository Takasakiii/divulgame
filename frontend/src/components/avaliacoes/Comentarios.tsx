import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { api, AvaliacaoDto, AnuncioOne, AvaliacaoView } from "../../api/api";
import { AxiosError } from "axios";

import StarRatingComponent from "./StarRating";
import SimpleButtonComponent from "../SimpleButton";
import ModalComponent from "../Modal";

export interface ComentariosComponentProps {
  anuncio: AnuncioOne;
}

function ComentariosComponent(props: ComentariosComponentProps) {
  const loginData = useSelector((state: RootState) => state.login);

  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);

  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoView[]>([]);

  const [update, setUpdate] = useState(false);

  const [modalState, setModalState] = useState({
    opened: false,
    message: "",
    cleanForm: false,
  });

  useEffect(() => {
    api
      .get<AvaliacaoView[]>(`/anuncios/${props.anuncio.id}/avaliacoes`)
      .then((response) => {
        setAvaliacoes(response.data);
      });
  }, [props.anuncio.id, update]);

  function handleAvaliacaoTxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComentario(e.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!loginData) return;

    const avaliacao: AvaliacaoDto = {
      comentario,
      nota,
    };

    api
      .post(`/anuncios/${props.anuncio.id}/avaliacoes`, avaliacao, {
        headers: {
          Authorization: loginData.token,
        },
      })
      .then(() => {
        setModalState({
          opened: true,
          message: "Avaliação enviada com sucesso!",
          cleanForm: true,
        });
      })
      .catch((err: AxiosError) => {
        setModalState({
          opened: true,
          message: err.response!.data.error,
          cleanForm: false,
        });
      });
  }

  function handleModalClose(newStare: boolean) {
    if (modalState.cleanForm) {
      setComentario("");
      setNota(0);
      setUpdate(!update);
    }

    setModalState({
      opened: newStare,
      message: "",
      cleanForm: false,
    });
  }

  return (
    <div className="w-4/5 border-2 border-solid border-gray-300 p-4 rounded-md">
      <h1 className="text-center text-2xl font-bold">
        Avaliações sobre o anuncio:
      </h1>
      <div className="mb-4">
        {avaliacoes.map(({ id, comentario, nota, username }) => (
          <div key={id} className="border-b-2 border-solid border-gray-300 p-2">
            <div className="flex">
              <h3 className="mr-2 text-xl font-bold">{username}</h3>
              <StarRatingComponent value={nota} disabled />
            </div>
            <p>{comentario}</p>
          </div>
        ))}
      </div>

      {loginData ? (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <span>Deixe sua Avaliação:</span>
          <div className="flex items-center">
            <StarRatingComponent
              className="mr-4"
              onStarClick={setNota}
              value={nota}
            />
            <input
              type="text"
              className="w-11/12 mr-2"
              onChange={handleAvaliacaoTxChange}
              value={comentario}
            />
            <SimpleButtonComponent type="submit" className="border-gray-300">
              <span>Enviar</span>
            </SimpleButtonComponent>
          </div>
        </form>
      ) : (
        <h2 className="text-center text-2xl p-4">
          Faça o Login e deixe seu comentario sobre esse anuncio.
        </h2>
      )}
      <ModalComponent state={modalState.opened} onClose={handleModalClose}>
        {modalState.message}
      </ModalComponent>
    </div>
  );
}

export default ComentariosComponent;
