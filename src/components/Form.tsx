import { FormEvent } from "react";

export interface FormComponentProps {
  children: React.ReactNode;
  onSubmit?: () => void;
}

function FormComponent({ children, onSubmit }: FormComponentProps) {
  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit && onSubmit();
  }

  return (
    <form className="bg-white rounded-md p-4" onSubmit={onSubmitHandler}>
      {children}
    </form>
  );
}

export default FormComponent;
