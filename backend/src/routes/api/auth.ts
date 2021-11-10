import type { Controller } from "../../handler";
import { Router } from "express";
import Usuario, { InvalidUserOrPassError, Login } from "../../database/usuario";
import { InvalidArgsError, ErrorReponse } from "../../database";

const authRouter: Controller = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const login = new Login(req.body);
      const usuario = new Usuario();
      const result = await usuario.login(login);
      res.json(result);
    } catch (err) {
      if (err instanceof InvalidUserOrPassError) {
        res
          .status(400)
          .json({ error: "Usuario ou senha invalida." } as ErrorReponse);
        return;
      }

      if (err instanceof InvalidArgsError) {
        res.status(400).json({ error: err.message } as ErrorReponse);
        return;
      }

      console.error(err);
      res
        .status(500)
        .json({ error: "Erro interno do servidor." } as ErrorReponse);
    }
  });

  return {
    url: "/api/auth",
    router,
  };
};

export default authRouter;
