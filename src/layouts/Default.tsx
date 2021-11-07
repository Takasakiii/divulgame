import NavbarProfileButtonComponent from "../components/navbar/NavbarProfileButton";
import ConfigurarMeiButtonComponent from "../components/navbar/ConfigurarMeiButton";

import Link from "next/link";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      <nav className="bg-blue-500 w-screen h-14 flex items-center p-4 justify-between">
        <Link href="/">
          <a className="text-xl font-bold text-white">Divulga-me</a>
        </Link>
        <div className="flex">
          <ConfigurarMeiButtonComponent
            className="mr-4 text-white"
            user={user}
          />
          <NavbarProfileButtonComponent user={user}>
            <span>Ola</span>
            <span>Ola</span>
          </NavbarProfileButtonComponent>
        </div>
      </nav>
      {children}
    </>
  );
}

export default DefaultLayout;
