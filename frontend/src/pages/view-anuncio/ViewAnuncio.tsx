import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnuncioOne, api, fotoUrl, tipoAnuncioToString } from "../../api/api";
import { AxiosError } from "axios";
import { useScreenSize } from "../../helpers/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import SliderComponent from "../../components/slider/Slider";
import ComentariosComponent from "../../components/avaliacoes/Comentarios";
import CenterTagComponent from "../../components/CenterTag";
import AdminBarComponent from "../../components/AdminBar";

import CrossSvg from "../../assets/svgs/iconmonstr-x-mark-4.svg";

import style from "./ViewAnuncio.module.css";

function ViewAnuncioPage() {
  const idAnuncio = useParams().id;
  const windowSize = useScreenSize();
  const loggedData = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const [anuncio, setAnuncio] = useState<AnuncioOne | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [wSliderStyle, setWSliderStyle] = useState<string | number>(
    "calc(100vw / 2)"
  );

  useEffect(() => {
    if (windowSize && windowSize.width <= 1145) {
      setWSliderStyle("100%");
    } else {
      setWSliderStyle("calc(100vw / 2)");
    }
  }, [windowSize]);

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

  function handleOnDelete() {
    if (!anuncio) return;
    if (!loggedData) return;

    api
      .delete(`/anuncios/${anuncio.id}`, {
        headers: {
          Authorization: loggedData.token,
        },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.error(err));
  }

  if (error) {
    return <div>{error.response?.data.error}</div>;
  }

  if (!anuncio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col p-6 items-center">
      <div className="flex justify-between w-full flex-wrap mb-8">
        <div className={`w-1/2 ${style.slider}`}>
          {images.length > 0 ? (
            <SliderComponent
              images={images}
              className="mb-4"
              width={wSliderStyle}
              height="calc((2 * 100vh) / 3)"
            />
          ) : (
            <div
              className={`flex justify-center items-center ${style.noImage} border-solid border-2 border-gray-300 rounded-md mr-4 ${style.slider}`}
            >
              <div className="flex flex-col items-center">
                <img
                  src={CrossSvg}
                  alt="x"
                  width="100"
                  height="100"
                  className="mb-2"
                />
                <h2 className="text-3xl">Sem Imagens</h2>
              </div>
            </div>
          )}
        </div>
        <div className={`w-1/2 ${style.info}`}>
          <div className="flex w-full justify-center items-center">
            <h1 className="text-4xl text-center mb-4 mr-4">
              {anuncio?.titulo}
            </h1>
          </div>
          <p className="text-justify bg-white p-4 rounded-md mb-2">
            {anuncio?.descricao}
          </p>
          <CenterTagComponent>
            <span className="border-solid border-2 border-gray-300 rounded-3xl p-2 font-bold text-xl mb-2">
              {tipoAnuncioToString(anuncio!.tipo)}
            </span>
            <span className="text-center block mb-4">
              Anunciado por: {anuncio!.user.nomeFantasia}
            </span>
            {loggedData?.user.id === anuncio.user.id && (
              <AdminBarComponent onDelete={handleOnDelete} />
            )}
          </CenterTagComponent>
        </div>
      </div>
      <ComentariosComponent anuncio={anuncio} />
    </div>
  );
}

export default ViewAnuncioPage;
