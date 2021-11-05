export interface CenterComponentProps {
  children: React.ReactNode;
}

function CenterComponent({ children }: CenterComponentProps) {
  return <div className="flex flex-col items-center">{children}</div>;
}

export default CenterComponent;
