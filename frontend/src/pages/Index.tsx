import { useEffect, useState } from "react";
import { AnuncioForMany, api } from "../api/api";

import ListCardsComponent from "../components/list-servicos/ListCards";
import CardComponent from "../components/list-servicos/Card";
import SearchBarComponent from "../components/SearchBar";

function IndexPage() {
  const [servicos, setServicos] = useState<AnuncioForMany[]>([]);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    const querry = !search ? "/anuncios" : `/anuncios?search=${search}`;

    api.get<AnuncioForMany[]>(querry).then((response) => {
      setServicos(response.data);
    });
  }, [search]);

  return (
    <div>
      <SearchBarComponent onSearch={setSearch} />
      <ListCardsComponent>
        {servicos.map((servico) => (
          <CardComponent key={servico.id} anuncio={servico} />
        ))}
      </ListCardsComponent>
    </div>
  );
}

export default IndexPage;
