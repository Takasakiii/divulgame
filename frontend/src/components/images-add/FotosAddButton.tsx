import React, { useRef } from "react";

import PlusIcon from "../../assets/svgs/iconmonstr-plus-5.svg";

export interface FotosAddButtonComponentProps {
  onClick?: (files: File[]) => void;
}

function FotosAddButtonComponent(props: FotosAddButtonComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleAddPictures(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0 && props.onClick) {
      let filesArray: File[] = Array(files.length);
      for (let i = 0; i < files.length; i++) {
        filesArray[i] = files[i];
      }
      props.onClick(filesArray);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="m-1 border-dashed border-2 rounded-md border-gray-300 p-2 flex items-center justify-center"
        onClick={handleClick}
      >
        <img src={PlusIcon} alt="Adicionar foto icone" width="40" height="40" />
      </button>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        accept="image/png, image/jpeg"
        multiple
        onChange={handleAddPictures}
      />
    </div>
  );
}

export default FotosAddButtonComponent;
