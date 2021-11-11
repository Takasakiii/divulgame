import { Request, Response, NextFunction } from "express";
import { ErrorReponse, InvalidEnvConfigError } from "../database";
import { JwtPayload } from "../database/usuario";
import jwt, { JwtPayload as DefaultPayload } from "jsonwebtoken";

function autorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Authorization está ausente!" } as ErrorReponse);
  }

  if (!process.env.JWT_SECRET) {
    throw new InvalidEnvConfigError("JWT_SECRET ausente");
  }

  jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido!" } as ErrorReponse);
    }

    const payload = decoded as JwtPayload & DefaultPayload;
    res.locals.user = {
      username: payload.username,
      id: payload.id,
    } as JwtPayload;

    next();
  });
}

export default autorizationMiddleware;
