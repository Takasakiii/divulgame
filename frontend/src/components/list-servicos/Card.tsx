import { AnuncioForMany, fotoUrl } from "../../api/api";

import { Link } from "react-router-dom";

import CrossSvg from "../../assets/svgs/iconmonstr-x-mark-4.svg";
import style from "./Card.module.css";

export interface CardComponentProps {
  anuncio: AnuncioForMany;
}

function CardComponent(props: CardComponentProps) {
  return (
    <div className={`bg-white m-4 rounded-md ${style.cardComponent}`}>
      <Link to={`/anuncios/${props.anuncio.id}`} className="flex p-4">
        {props.anuncio.icone ? (
          <img
            src={fotoUrl(props.anuncio.icone)}
            alt="Foto inical do anuncio"
            className={`object-cover object-center mr-2 rounded-md ${style.cardImg}`}
          />
        ) : (
          <div className={`${style.noImage} mr-2`}>
            <img src={CrossSvg} alt="No Icon" />
            <span>Sem Imagem</span>
          </div>
        )}
        <div className="w-full h-full">
          <h1 className="text-center text-xl font-bold">
            {props.anuncio.titulo}
          </h1>
          <p>{props.anuncio.descricao}</p>
        </div>
      </Link>
    </div>
  );
}

export default CardComponent;
