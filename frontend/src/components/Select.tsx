import React from "react";

export interface SelectOptions {
  label: string;
  value: number;
}

export interface SelectComponentProps {
  label: string;
  className?: string;
  options?: SelectOptions[];
  onChange?: (value: number) => void;
  selectedItem: number;
}

function SelectComponent(props: SelectComponentProps) {
  function onChangeHandle(e: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange && props.onChange(parseInt(e.target.value));
  }

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-1 ml-1">{props.label}</label>
      <select
        className="border-gray-200 border-solid border-2 p-1 rounded-md"
        onChange={onChangeHandle}
        defaultValue={props.selectedItem}
      >
        {props.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
