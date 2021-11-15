import { Controller } from "../handler";
import { Router } from "express";
import FotosAnuncios from "../database/fotosAnuncios";
import { InvalidArgsError, ErrorReponse } from "../database";

const images: Controller = (db) => {
  const router = Router();

  router.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const fotoAnuncio = new FotosAnuncios(db);
      const fotoResult = await fotoAnuncio.getFoto(id);
      res.set("Content-Type", fotoResult.mimeType);
      res.send(fotoResult.foto);
    } catch (err) {
      if (err instanceof InvalidArgsError) {
        return res.status(404).send({ error: err.message } as ErrorReponse);
      }

      console.error(err);
      res
        .status(500)
        .send({ error: "Erro interno do servidor." } as ErrorReponse);
    }
  });

  return {
    url: "/images",
    router,
  };
};

export default images;
