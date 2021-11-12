export interface FotosListaAddComponentProps {
  className?: string;
  label: string;
  children?: React.ReactNode;
}

function FotosListaAddComponent(props: FotosListaAddComponentProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-1 ml-1">{props.label}</label>
      <div className="border-dashed border-2 border-gray-300 rounded-md p-2 flex flex-wrap justify-center">
        {props.children}
      </div>
    </div>
  );
}

export default FotosListaAddComponent;
