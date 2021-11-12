export interface FotoItemViewComponentProps {
  foto: File;
}

function FotoItemViewComponent(props: FotoItemViewComponentProps) {
  const urlView = URL.createObjectURL(props.foto);

  return (
    <div
      style={{ width: 56, height: 56 }}
      className="border-2 border-gray-300 border-solid rounded-md m-1"
    >
      <img
        src={urlView}
        alt="Imagem para carregar"
        className="rounded-md object-cover w-full h-full object-center"
      />
    </div>
  );
}

export default FotoItemViewComponent;
