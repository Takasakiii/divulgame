import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { api } from "../../api/api";

import CenterTagComponent from "../CenterTag";

import PlusSvg from "../../assets/svgs/iconmonstr-plus-5.svg";

export interface AddFotoButtonComponentProps {
  onAdd?: (fotosId: number[]) => void;
  anuncioId: number;
}

function AddFotoButtonComponent(props: AddFotoButtonComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const loggedUserData = useSelector((state: RootState) => state.login);

  function onButtonClick() {
    if (!inputRef.current) return;

    inputRef.current.click();
  }

  async function onAddPictures(e: React.ChangeEvent<HTMLInputElement>) {
    if (!loggedUserData) return;
    console.log(e.target.files);

    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray: number[] = Array(files.length);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("fotos", files[i]);
      }

      try {
        const response = await api.post(
          `/anuncios/${props.anuncioId}/fotos`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: loggedUserData.token,
            },
          }
        );

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <CenterTagComponent>
      <button
        type="button"
        className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-4 rounded-md"
        onClick={onButtonClick}
      >
        <img src={PlusSvg} alt="Icone Adicionar" />
        <span>Adicionar foto</span>
        <input
          className="hidden"
          type="file"
          ref={inputRef}
          accept="image/png, image/jpeg"
          multiple
          onChange={onAddPictures}
        />
      </button>
    </CenterTagComponent>
  );
}

export default AddFotoButtonComponent;
