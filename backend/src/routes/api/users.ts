import type { Controller } from "../../handler";
import { Router } from "express";
import Usuario, { UsuarioDto } from "../../database/usuario";
import { InvalidArgsError, ErrorReponse } from "../../database";

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

  return {
    router,
    url: "/api/users",
  };
};

export default users;
