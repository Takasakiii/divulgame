import type { NextApiRequest, NextApiResponse } from "next";
import Login from "../../api/Login";
import { InvalidArgsError } from "../../api/Api";

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    res.status(405).end("Method not allowed");
    return;
  }

  try {
    const login = new Login();
    const response = await login.create(req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof InvalidArgsError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

export default handle;
