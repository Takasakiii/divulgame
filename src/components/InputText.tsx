export interface InputTextComponentProps {
  label: string;
  type?: string;
  className?: string;
}

function InputTextComponent({
  label,
  type,
  className,
}: InputTextComponentProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor="txInput" className="text-sm p-1">
        {label}
      </label>
      <input
        id="txInput"
        type={type || "text"}
        className="border-gray-200 border-2 border-solid rounded-md p-2"
      />
    </div>
  );
}

export default InputTextComponent;