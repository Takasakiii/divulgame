import { Route, HashRouter, Routes } from "react-router-dom";

import IndexPage from "./pages/Index";

export interface RouterProps {
  children?: React.ReactNode;
}

function Router(props: RouterProps) {
  return (
    <HashRouter>
      {props.children}
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
