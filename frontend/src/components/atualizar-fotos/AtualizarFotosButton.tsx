import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { fotoUrl, api } from "../../api/api";

import ModalComponent from "../Modal";
import FotoButtonComponent from "./FotoButton";

import FotosSvg from "../../assets/svgs/iconmonstr-picture-7.svg";

export interface AtualizarFotosButtonComponentProps {
  className?: string;
  fotos: number[];
  anuncioId: number;
}

function AtualizarFotosButtonComponent(
  props: AtualizarFotosButtonComponentProps
) {
  const loggedUserData = useSelector((state: RootState) => state.login);
  const [modalState, setModalState] = useState(false);
  const [fotos, setFotos] = useState(props.fotos);

  function onButtonClick() {
    setModalState(true);
  }

  function handleRemoveFoto(value: number) {
    if (!loggedUserData) return;

    api
      .delete(`/anuncios/${props.anuncioId}/fotos/${value}`, {
        headers: {
          Authorization: loggedUserData.token,
        },
      })
      .then(() => {
        setFotos(fotos.filter((foto) => foto !== value));
      });
  }

  return (
    <div>
      <button
        type="button"
        className={`flex border-2 border-gray-200 border-solid p-1 rounded-md ${props.className}`}
        onClick={onButtonClick}
      >
        <img src={FotosSvg} alt="Icone Fotos" className="mr-2" /> Atualizar
        fotos
      </button>
      <ModalComponent state={modalState} onClose={setModalState}>
        <div className="overflow-y-auto pr-2" style={{ height: "90vh" }}>
          {fotos.map((fotoId) => (
            <FotoButtonComponent
              key={fotoId}
              value={fotoId}
              src={fotoUrl(fotoId)}
              className="mb-2"
              onRemove={handleRemoveFoto}
            />
          ))}
        </div>
      </ModalComponent>
    </div>
  );
}

export default AtualizarFotosButtonComponent;
