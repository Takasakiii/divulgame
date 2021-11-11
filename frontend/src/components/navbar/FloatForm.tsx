export interface FloatFormComponentProps {
  onSubmit?: () => void;
  children?: React.ReactNode;
}

function FloatFormComponent(props: FloatFormComponentProps) {
  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onSubmit && props.onSubmit();
  }

  return (
    <form
      className="absolute p-4 top-12 bg-white rounded-md text-black right-0 w-max flex flex-col"
      onSubmit={onSubmitHandler}
    >
      {props.children}
    </form>
  );
}

export default FloatFormComponent;
