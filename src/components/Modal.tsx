import ButtonComponent from "./Button";
import CenterComponent from "./Center";

export interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function ModalComponent({
  isOpen,
  onClose,
  children,
  title,
}: ModalComponentProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bg-black bg-opacity-20 top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md flex-col">
        <h1 className="text-2xl mb-3 border-b border-solid border-gray-200">
          {title}
        </h1>
        {children}
        <div className="mt-4">
          <CenterComponent>
            <ButtonComponent label="Fechar" onClick={onClose} />
          </CenterComponent>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
