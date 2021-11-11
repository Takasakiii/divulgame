import { Link } from "react-router-dom";

export interface LinkFormComponentProps {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "link" | "button";
}

function LinkFormComponent(props: LinkFormComponentProps) {
  const style = "border-b-2 border-solid border-gray-200";
  const to = props.to || "/";

  if (props.type === "button") {
    return (
      <button className={style} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }

  return (
    <Link className={style} to={to} onClick={props.onClick}>
      {props.children}
    </Link>
  );
}

export default LinkFormComponent;
