export interface CenterTagComponentProps {
  children?: React.ReactNode;
}

function CenterTagComponent(props: CenterTagComponentProps) {
  return <div className="flex justify-center">{props.children}</div>;
}

export default CenterTagComponent;
