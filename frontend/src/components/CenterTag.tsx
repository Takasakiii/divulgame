export interface CenterTagComponentProps {
  children?: React.ReactNode;
}

function CenterTagComponent(props: CenterTagComponentProps) {
  return <div className="flex items-center flex-col">{props.children}</div>;
}

export default CenterTagComponent;
