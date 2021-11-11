import { Controller } from "../../handler";
import { Router } from "express";
import Usuario, {
  MeiDto,
  UsuarioDto,
  JwtPayload,
} from "../../database/usuario";
import { InvalidArgsError, ErrorReponse } from "../../database";
import autorizationMiddleware from "../../middlewares/authorizationMiddleware";

const users: Controller = (db) => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const usuario = new Usuario(db);
      const body = new UsuarioDto(req.body);
      const responseUsuario = await usuario.create(body);
      res.status(201).json(responseUsuario);
    } catch (err) {
      if (err instanceof InvalidArgsError) {
        res.status(400).json({ error: err.message } as ErrorReponse);
      } else if (err instanceof Error) {
        if (err.message.includes("Unique constraint")) {
          res
            .status(400)
            .json({ error: "Usuário já cadastrado" } as ErrorReponse);
        } else {
          console.error(err);
          res
            .status(500)
            .json({ error: "Internal Server Error" } as ErrorReponse);
        }
      }
    }
  });

  router.post("/:id/mei", autorizationMiddleware, async (req, res) => {
    try {
      const usuarioLogged: JwtPayload = res.locals.user;
      const userRouteId = parseInt(req.params.id);
      if (userRouteId !== usuarioLogged.id) {
        res
          .status(403)
          .json({ error: "Usuário não autorizado" } as ErrorReponse);
        return;
      }

      const usuario = new Usuario(db);
      const body = new MeiDto(req.body);
      await usuario.addMeiData(userRouteId, body);
      res.status(200).json({ success: true });
    } catch (err) {
      if (err instanceof InvalidArgsError) {
        res.status(400).json({ error: err.message } as ErrorReponse);
      } else {
        console.error(err);
        res
          .status(500)
          .json({ error: "Internal Server Error" } as ErrorReponse);
      }
    }
  });

  return {
    router,
    url: "/api/users",
  };
};

export default users;
