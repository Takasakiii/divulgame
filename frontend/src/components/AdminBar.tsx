import TrashSvg from "../assets/svgs/iconmonstr-trash-can-27.svg";
import PencilSvg from "../assets/svgs/iconmonstr-pencil-7.svg";

export interface AdminBarComponentProps {
  className?: string;
}

function AdminBarComponent(props: AdminBarComponentProps) {
  return (
    <div className={`bg-white flex p-4 rounded-md ${props.className}`}>
      <button className="mr-4 flex">
        <img src={TrashSvg} alt="Excluir anuncio" className="mr-2" />
        <span>Deletar Anuncio</span>
      </button>
      <button className="flex">
        <img src={PencilSvg} alt="Editar anuncio" className="mr-2" />
        <span>Editar Anuncio</span>
      </button>
    </div>
  );
}

export default AdminBarComponent;
