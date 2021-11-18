import React, { useState } from "react";
import classNames from "classnames";

import TrashSvg from "../assets/svgs/iconmonstr-trash-can-27.svg";
// import PencilSvg from "../assets/svgs/iconmonstr-pencil-7.svg";

export interface AdminBarComponentProps {
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

function AdminBarComponent(props: AdminBarComponentProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const confirmCss = "text-red-600";
  const confirmIcon: React.CSSProperties = {
    filter:
      "invert(17%) sepia(94%) saturate(3484%) hue-rotate(351deg) brightness(94%) contrast(90%)",
  };

  function handleDelete() {
    if (confirmDelete) {
      props.onDelete && props.onDelete();
    }

    setConfirmDelete(!confirmDelete);
  }

  return (
    <div className={`bg-white flex p-4 rounded-md ${props.className}`}>
      <button type="button" className="flex" onClick={handleDelete}>
        <img
          src={TrashSvg}
          style={confirmDelete ? confirmIcon : undefined}
          alt="Excluir anuncio"
          className="mr-2"
        />
        <span
          className={classNames({
            [confirmCss]: confirmDelete,
          })}
        >
          {confirmDelete
            ? "Clique novamente para confirmar"
            : "Deletar Anuncio"}
        </span>
      </button>
      {/* <button type="button" className="flex" onClick={props.onEdit}>
        <img src={PencilSvg} alt="Editar anuncio" className="mr-2" />
        <span>Editar Anuncio</span>
      </button> */}
    </div>
  );
}

export default AdminBarComponent;
