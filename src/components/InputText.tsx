import { ChangeEvent } from "react";

export interface InputTextComponentProps {
  label: string;
  type?: string;
  className?: string;
  onChange?: (text: string) => void;
}

function InputTextComponent({
  label,
  type,
  className,
  onChange,
}: InputTextComponentProps) {
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e.target.value);
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm p-1">{label}</label>
      <input
        type={type || "text"}
        className="border-gray-200 border-2 border-solid rounded-md p-2"
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default InputTextComponent;
