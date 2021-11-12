import { Controller } from "../../handler";
import { Router } from "express";
import autorizationMiddleware from "../../middlewares/authorizationMiddleware";
import Anuncio, { AnuncioDto } from "../../database/anuncio";
import { JwtPayload } from "../../database/usuario";
import { ErrorReponse, InvalidArgsError } from "../../database";

const anuncioRouter: Controller = (db) => {
  const router = Router();

  router.post("/", autorizationMiddleware, async (req, res) => {
    try {
      const loggedUser = res.locals.user as JwtPayload;

      const anuncioDto = new AnuncioDto(req.body);
      const anuncio = new Anuncio(db);
      const result = await anuncio.create(anuncioDto, loggedUser.id);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidArgsError) {
        res.status(400).json({ error: err.message } as ErrorReponse);
      } else {
        console.error(err);
        res
          .status(500)
          .json({ error: "Internal server error" } as ErrorReponse);
      }
    }
  });

  return {
    url: "/api/anuncios",
    router,
  };
};

export default anuncioRouter;
