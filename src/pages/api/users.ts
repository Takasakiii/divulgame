import type { NextApiRequest, NextApiResponse } from "next";
import Login from "../../api/Login";
import { InvalidArgsError } from "../../api/Api";

function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      post(req, res);
      break;
    default:
      res.status(405).end(`Method Not Allowed`);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const login = new Login();
    const response = await login.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof InvalidArgsError) {
      res.status(400).json({
        error: error.message,
      });
    } else if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        res.status(400).json({
          error: "Usuario ou email ja cadastrado anteriormente",
        });
      } else {
        console.error(error);
        res.status(500).json({
          error: "Internal server error",
        });
      }
    }
  }
}

export default handle;
