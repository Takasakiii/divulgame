import { useState, useRef } from "react";

export interface SearchBarComponentProps {
  onSearch?: (value: string | null) => void;
}

function SearchBarComponent(props: SearchBarComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeout, setTimeoutValue] = useState<NodeJS.Timeout | null>(null);

  function handleTimeout() {
    const value =
      inputRef.current && inputRef.current.value.length > 0
        ? inputRef.current.value
        : null;

    props.onSearch && props.onSearch(value);
  }

  function onSearchKeyPress() {
    if (timeout !== null) clearTimeout(timeout);
    setTimeoutValue(setTimeout(handleTimeout, 1000));
  }

  return (
    <div className="m-4">
      <input
        type="text"
        placeholder="Pesquisar..."
        className="w-full p-2 rounded-md"
        onKeyDown={onSearchKeyPress}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchBarComponent;
