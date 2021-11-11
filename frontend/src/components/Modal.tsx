import SimpleButtonComponent from "./SimpleButton";
import CenterTagComponent from "./CenterTag";

export interface ModalComponentProps {
  children: React.ReactNode;
  state: boolean;
  onClose?: (newState: boolean) => void;
}

function ModalComponent(props: ModalComponentProps) {
  if (!props.state) return <></>;

  function handleClose() {
    props.onClose && props.onClose(false);
  }

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      className="fixed top-0 left-0 right-0 bottom-0 bg flex justify-center items-center"
    >
      <div className="bg-white p-4 border-2 border-gray-400 border-solid rounded-md text-black flex flex-col">
        <div className="mb-2 border-solid border-b-2 border-gray-100">
          {props.children}
        </div>
        <CenterTagComponent>
          <SimpleButtonComponent onClick={handleClose}>
            Fechar
          </SimpleButtonComponent>
        </CenterTagComponent>
      </div>
    </div>
  );
}

export default ModalComponent;
