import { Link } from "react-router-dom";

export interface LinkFormComponentProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function LinkFormComponent(props: LinkFormComponentProps) {
  return (
    <Link
      className="border-b-2 border-solid border-gray-200"
      to={props.to}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
}

export default LinkFormComponent;
