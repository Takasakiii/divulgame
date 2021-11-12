import { Controller } from "../../handler";
import { Router } from "express";
import autorizationMiddleware from "../../middlewares/authorizationMiddleware";
import Anuncio, { AnuncioDto } from "../../database/anuncio";
import { JwtPayload } from "../../database/usuario";
import {
  ErrorReponse,
  InvalidArgsError,
  InvalidFileTypeError,
} from "../../database";
import multer from "multer";
import FotosAnuncios, { FotosSavedInfo } from "../../database/fotosAnuncios";

const anuncioRouter: Controller = (db) => {
  const router = Router();
  const upload = multer({
    dest: "./uploads",
    fileFilter: (_req, file, cb) => {
      if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
        return cb(new InvalidFileTypeError("Imagem deve ser PNG ou JPG"));
      }
      cb(null, true);
    },
  });
  const uploadFotosGalery = upload.array("fotos", 10);

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

  router.post("/:id/fotos", autorizationMiddleware, (req, res) => {
    uploadFotosGalery(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message } as ErrorReponse);
      }

      const idAnuncio = parseInt(req.params.id);

      try {
        const { id: loggedUserId } = res.locals.user as JwtPayload;
        const multerFiles = req.files as Express.Multer.File[] | undefined;

        if (!multerFiles) {
          return res
            .status(400)
            .json({ error: "Nenhuma imagem enviada" } as ErrorReponse);
        }

        const fotos: FotosSavedInfo[] = multerFiles.map((foto) => ({
          path: foto.path,
          mimeType: foto.mimetype,
        }));
        const database = new FotosAnuncios(db);
        await database.create(loggedUserId, idAnuncio, fotos);
        res.status(201).json({ message: "Fotos enviadas com sucesso" });
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
  });

  return {
    url: "/api/anuncios",
    router,
  };
};

export default anuncioRouter;
