export interface ButtonComponentProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

function ButtonComponent({ label, className, onClick }: ButtonComponentProps) {
  return (
    <button
      type="button"
      className={`p-2 border-solid border-2 border-gray-200 rounded-md hover:bg-gray-200 duration-75 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonComponent;
