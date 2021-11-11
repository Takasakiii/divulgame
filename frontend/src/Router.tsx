import { Route, HashRouter, Routes } from "react-router-dom";

import IndexPage from "./pages/Index";
import CadastroPage from "./pages/Cadastro";
import CadastroMeiPage from "./pages/CadastroMei";

export interface RouterProps {
  children?: React.ReactNode;
}

function Router(props: RouterProps) {
  return (
    <HashRouter>
      {props.children}
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/cadastro-mei" element={<CadastroMeiPage />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
