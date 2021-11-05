import type { NextApiRequest, NextApiResponse } from "next";
import Login, { InvalidUserOrPassError } from "../../api/Login";

function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      res.status(405).end("Method Not Allowed");
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const login = new Login();
    const response = await login.login(req.body);

    res.status(200).json(response);
  } catch (err) {
    if (err instanceof InvalidUserOrPassError) {
      res.status(401).json({
        error: "Usuario ou senha invalidos.",
      });
    } else {
      res.status(500).json({
        error: "Erro interno do servidor.",
      });
    }
  }
}

export default handle;
