import { useState } from "react";

import ModalComponent from "../Modal";
import FotoButtonComponent from "./FotoButton";
import { fotoUrl } from "../../api/api";

import FotosSvg from "../../assets/svgs/iconmonstr-picture-7.svg";

export interface AtualizarFotosButtonComponentProps {
  className?: string;
  fotos: number[];
}

function AtualizarFotosButtonComponent(
  props: AtualizarFotosButtonComponentProps
) {
  const [modalState, setModalState] = useState(false);

  function onButtonClick() {
    setModalState(true);
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
          {props.fotos.map((fotoId) => (
            <FotoButtonComponent
              key={fotoId}
              value={fotoId}
              src={fotoUrl(fotoId)}
              className="mb-2"
            />
          ))}
        </div>
      </ModalComponent>
    </div>
  );
}

export default AtualizarFotosButtonComponent;
