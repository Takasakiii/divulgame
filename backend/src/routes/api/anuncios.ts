import { Controller } from "../../handler";
import { Router } from "express";
import autorizationMiddleware from "../../middlewares/authorizationMiddleware";
import Anuncio, { AnuncioDto } from "../../database/anuncio";
import { JwtPayload } from "../../database/usuario";
import {
  ErrorReponse,
  InvalidArgsError,
  InvalidFileTypeError,
  NotFoundError,
  UnauthorizedError,
} from "../../database";
import multer from "multer";
import FotosAnuncios, { FotosSavedInfo } from "../../database/fotosAnuncios";
import Avaliacao, { AvaliacaoDto } from "../../database/avaliacao";

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
          path: foto.filename,
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

  router.get("/", async (req, res) => {
    try {
      const searchParams = req.query.search;
      const anuncio = new Anuncio(db);
      if (searchParams) {
        const searchResult = await anuncio.find(searchParams.toString());
        return res.status(200).json(searchResult);
      }

      const authorSearchParams = req.query.author;
      if (authorSearchParams) {
        const authorId = parseInt(authorSearchParams.toString());
        const result = await anuncio.findByUser(authorId);
        return res.status(200).json(result);
      }

      const result = await anuncio.findAll();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" } as ErrorReponse);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const anuncio = new Anuncio(db);
      const result = await anuncio.get(id);
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message } as ErrorReponse);
      }

      if (err instanceof InvalidArgsError) {
        return res.status(500).json({ error: err.message } as ErrorReponse);
      }

      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error" } as ErrorReponse);
    }
  });

  router.post(
    "/:anuncio/avaliacoes",
    autorizationMiddleware,
    async (req, res) => {
      try {
        const idAnuncio = parseInt(req.params.anuncio);
        const { id: loggedUserId } = res.locals.user as JwtPayload;
        const avaliacao = new AvaliacaoDto(req.body);
        const avaliacaoDatabase = new Avaliacao(db);
        const result = await avaliacaoDatabase.create(
          loggedUserId,
          idAnuncio,
          avaliacao
        );
        return res.status(201).json(result);
      } catch (err) {
        if (err instanceof InvalidArgsError) {
          return res.status(400).json({ error: err.message } as ErrorReponse);
        }

        console.error(err);
        return res
          .status(500)
          .json({ error: "Internal server error" } as ErrorReponse);
      }
    }
  );

  router.get("/:anuncio/avaliacoes", async (req, res) => {
    try {
      const idAnuncio = parseInt(req.params.anuncio);
      const avaliacao = new Avaliacao(db);
      const result = await avaliacao.get(idAnuncio);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error" } as ErrorReponse);
    }
  });

  router.delete("/:anuncio", autorizationMiddleware, async (req, res) => {
    try {
      const idAnuncio = parseInt(req.params.anuncio);
      const { id: loggedUserId } = res.locals.user as JwtPayload;
      const anuncio = new Anuncio(db);
      await anuncio.remove(idAnuncio, loggedUserId);
      return res.status(200).json({ message: "Anuncio removido com sucesso" });
    } catch (err) {
      if (err instanceof InvalidArgsError) {
        return res.status(400).json({ error: err.message } as ErrorReponse);
      }

      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal server error" } as ErrorReponse);
    }
  });

  router.delete(
    "/:anuncio/fotos/:id",
    autorizationMiddleware,
    async (req, res) => {
      try {
        const idFoto = parseInt(req.params.id);

        const { id: LoggedUserId } = res.locals.user as JwtPayload;
        const anuncio = new Anuncio(db);
        await anuncio.removeFoto(idFoto, LoggedUserId);
        return res.status(200).json({ message: "Foto removida com sucesso" });
      } catch (err) {
        if (err instanceof NotFoundError) {
          return res.status(404).json({ error: err.message } as ErrorReponse);
        }

        if (err instanceof UnauthorizedError) {
          return res.status(401).json({ error: err.message } as ErrorReponse);
        }

        if (err instanceof InvalidArgsError) {
          return res.status(400).json({ error: err.message } as ErrorReponse);
        }

        console.error(err);
        return res
          .status(500)
          .json({ error: "Internal server error" } as ErrorReponse);
      }
    }
  );

  return {
    url: "/api/anuncios",
    router,
  };
};

export default anuncioRouter;
