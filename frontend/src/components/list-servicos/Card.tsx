import { AnuncioForMany } from "../../api/api";

import "./Card.css";

export interface CardComponentProps {
  anuncio: AnuncioForMany;
}

function CardComponent(props: CardComponentProps) {
  return (
    <div className="bg-white m-4 p-4 rounded-md flex card-component">
      {props.anuncio.fotos.length > 0 ? (
        <img
          src="https://google.com/google.jpg"
          alt="Foto inical do anuncio"
          className="object-cover object-center mr-2"
        />
      ) : (
        <></>
      )}
      <div className="w-full h-full">
        <h1 className="text-center text-xl font-bold">
          {props.anuncio.titulo}
        </h1>
        <p>{props.anuncio.descricao}</p>
      </div>
    </div>
  );
}

export default CardComponent;
