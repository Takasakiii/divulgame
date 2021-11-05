export interface FormButtonComponentProps {
  label: string;
  className?: string;
}

function FormButtonComponent({ label, className }: FormButtonComponentProps) {
  return (
    <button
      type="submit"
      className={`p-2 border-solid border-2 border-gray-200 rounded-md hover:bg-gray-200 duration-75 ${className}`}
    >
      {label}
    </button>
  );
}

export default FormButtonComponent;
