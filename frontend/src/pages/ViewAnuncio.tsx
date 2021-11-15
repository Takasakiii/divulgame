import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnuncioOne, api, fotoUrl } from "../api/api";
import { AxiosError } from "axios";

import CenterTagComponent from "../components/CenterTag";
import SliderComponent from "../components/slider/Slider";

function ViewAnuncioPage() {
  const idAnuncio = useParams().id;

  const [anuncio, setAnuncio] = useState<AnuncioOne | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!idAnuncio) {
      setAnuncio(null);
      return;
    }

    api
      .get<AnuncioOne>(`/anuncios/${idAnuncio}`)
      .then((response) => {
        setAnuncio(response.data);
        setImages(response.data.fotos.map((foto) => fotoUrl(foto)));
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [idAnuncio]);

  return (
    <div>
      {error ? (
        <div>{error.response?.data.error}</div>
      ) : (
        <div>
          <CenterTagComponent>
            <h1 className="text-5xl m-4">{anuncio?.titulo}</h1>
            {images.length > 0 && (
              <SliderComponent images={images} className="mb-4" />
            )}
            <p>{anuncio?.descricao}</p>
          </CenterTagComponent>
        </div>
      )}
    </div>
  );
}

export default ViewAnuncioPage;
