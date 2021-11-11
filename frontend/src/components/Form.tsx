export interface FormComponentProps {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

function FormComponent(props: FormComponentProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onSubmit && props.onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-4 w-min rounded-md m-4 ${props.className}`}
    >
      {props.children}
    </form>
  );
}

export default FormComponent;
