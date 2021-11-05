export interface CenterScreenComponentProps {
  children: React.ReactNode;
}

function CenterScreenComponent({ children }: CenterScreenComponentProps) {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
}

export default CenterScreenComponent;
