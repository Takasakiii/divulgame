import { Route, HashRouter, Routes } from "react-router-dom";

import IndexPage from "./pages/Index";
import CadastroPage from "./pages/Cadastro";
import CadastroMeiPage from "./pages/CadastroMei";
import CadastroServicosPage from "./pages/CadastroServicos";
import ViewAnuncioPage from "./pages/view-anuncio/ViewAnuncio";
import MeusAnunciosPage from "./pages/meus-anuncios/MeusAnuncios";
import AtualizarAnuncioPage from "./pages/AtualizarAnuncio";

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
        <Route path="/anuncios/adicionar" element={<CadastroServicosPage />} />
        <Route path="/anuncios/@me" element={<MeusAnunciosPage />} />
        <Route path="/anuncios/:id" element={<ViewAnuncioPage />} />
        <Route path="/anuncios/:id/editar" element={<AtualizarAnuncioPage />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
