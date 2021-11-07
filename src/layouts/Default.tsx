import NavbarProfileButtonComponent from "../components/navbar/NavbarProfileButton";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <nav className="bg-blue-500 w-screen h-14 flex items-center p-4 justify-between">
        <h1 className="text-xl font-bold text-white">Divulga-me</h1>
        <NavbarProfileButtonComponent>
          <span>Ola</span>
          <span>Ola</span>
        </NavbarProfileButtonComponent>
      </nav>
      {children}
    </>
  );
}

export default DefaultLayout;
