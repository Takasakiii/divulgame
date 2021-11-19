export interface FotosButtonComponentProps {
  className?: string;
  value: number;
  src: string;
  onRemove?: (value: number) => void;
}

function FotoButtonComponent(props: FotosButtonComponentProps) {
  function handleRemoveButton() {
    props.onRemove && props.onRemove(props.value);
  }

  return (
    <div className={`relative p-4 ${props.className}`}>
      <button
        style={{
          backgroundColor: "red",
        }}
        className="absolute w-8 h-8 text-white text-2xl rounded-3xl top-1 right-1"
        type="button"
        onClick={handleRemoveButton}
      >
        &times;
      </button>
      <img
        src={props.src}
        alt={`Foto de id: ${props.value}`}
        className="mr-2 object-cover object-center rounded-md"
        width="350"
        height="150"
      />
    </div>
  );
}

export default FotoButtonComponent;
