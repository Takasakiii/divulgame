import React from "react";

export interface InputTextComponentProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  className?: string;
}

function InputTextComponent(props: InputTextComponentProps) {
  const type = props.type || "text";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange && props.onChange(e.target.value);
  }

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-1 ml-1">{props.label}</label>
      <input
        type={type}
        className="border-gray-200 border-solid border-2 p-1 rounded-md"
        onChange={handleChange}
      />
    </div>
  );
}

export default InputTextComponent;
