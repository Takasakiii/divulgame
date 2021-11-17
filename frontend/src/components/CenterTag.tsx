export interface CenterTagComponentProps {
  children?: React.ReactNode;
  className?: string;
}

function CenterTagComponent(props: CenterTagComponentProps) {
  return (
    <div className={`flex items-center flex-col ${props.className}`}>
      {props.children}
    </div>
  );
}

export default CenterTagComponent;
