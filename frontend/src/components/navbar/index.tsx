import { Link } from "react-router-dom";
import LoginButtonComponent from "./LoginButton";

export interface NavbarComponentProps {
  children?: React.ReactNode;
}

function NavbarComponent(props: NavbarComponentProps) {
  return (
    <>
      <nav className="h-14 bg-blue-500 text-white w-full flex justify-between items-center p-4">
        <Link to="/">Divulga-me</Link>
        <LoginButtonComponent />
      </nav>
      {props.children}
    </>
  );
}

export default NavbarComponent;
