import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import { AnuncioForMany, api } from "../../api/api";

import ListCardsComponent from "../../components/list-servicos/ListCards";
import CardComponent from "../../components/list-servicos/Card";

function MeusAnunciosPage() {
  const navigate = useNavigate();
  const loggedData = useSelector((state: RootState) => state.login);

  const [anuncios, setAnuncios] = useState<AnuncioForMany[]>([]);

  useEffect(() => {
    if (!loggedData) {
      navigate("/");
      return;
    }
    api
      .get<AnuncioForMany[]>(`/anuncios/?author=${loggedData.user.id}`)
      .then((response) => {
        setAnuncios(response.data);
      });
  }, [loggedData, navigate]);

  return (
    <div>
      <ListCardsComponent>
        {anuncios.map((anuncio) => (
          <CardComponent key={anuncio.id} anuncio={anuncio} />
        ))}
      </ListCardsComponent>
    </div>
  );
}

export default MeusAnunciosPage;
