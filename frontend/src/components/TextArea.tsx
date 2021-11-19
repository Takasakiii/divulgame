import React from "react";

export interface TextAreaComponentProps {
  label: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

function TextAreaComponent(props: TextAreaComponentProps) {
  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange && props.onChange(e.target.value);
  }

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-1 ml-1">{props.label}</label>
      <textarea
        className="border-gray-200 border-solid border-2 p-1 rounded-md"
        onChange={handleOnChange}
        value={props.value}
      />
    </div>
  );
}

export default TextAreaComponent;
