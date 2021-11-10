import React from "react";

export interface SimpleButtonComponentProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

function SimpleButtonComponent(props: SimpleButtonComponentProps) {
  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    props.onClick && props.onClick();
  }

  return (
    <button
      type={props.type}
      className={`border-gray-200 border-solid border-2 p-2 rounded-md ${props.className}`}
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
}

export default SimpleButtonComponent;
