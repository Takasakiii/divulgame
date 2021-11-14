import { useEffect, useState } from "react";
import { AnuncioForMany, api } from "../api/api";

import ListCardsComponent from "../components/list-servicos/ListCards";
import CardComponent from "../components/list-servicos/Card";

function IndexPage() {
  const [servicos, setServicos] = useState<AnuncioForMany[]>([]);

  useEffect(() => {
    api.get<AnuncioForMany[]>("/anuncios").then((response) => {
      setServicos(response.data);
    });
  }, []);

  return (
    <div>
      <ListCardsComponent>
        {servicos.map((servico) => (
          <CardComponent key={servico.id} anuncio={servico} />
        ))}
      </ListCardsComponent>
    </div>
  );
}

export default IndexPage;
