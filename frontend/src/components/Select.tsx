export interface SelectOptions {
  label: string;
  value: string | number;
}

export interface SelectComponentProps {
  label: string;
  className?: string;
  options?: SelectOptions[];
}

function SelectComponent(props: SelectComponentProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-1 ml-1">{props.label}</label>
      <select className="border-gray-200 border-solid border-2 p-1 rounded-md">
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
