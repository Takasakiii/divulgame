import { PrismaClient } from "@prisma/client";
import { InvalidArgsError } from "./Api";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface CadastroUserDto {
  nome: string;
  nomeSocial?: string;
  email: string;
  senha: string;
  username: string;
}

export interface SimplifiedUser {
  id: number;
  username: string;
  isMei: boolean;
}

export interface LoginDto {
  username: string;
  senha: string;
}

export class InvalidUserOrPassError extends InvalidArgsError {
  constructor() {
    super("Usuário ou senha inválidos");
  }
}

export interface JwtPayload {
  id: number;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: SimplifiedUser;
}

class Login {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private validate(data: CadastroUserDto) {
    if (!data.nome) throw new InvalidArgsError("Nome é obrigatório");
    if (!data.email) throw new InvalidArgsError("Email é obrigatório");
    if (!data.senha) throw new InvalidArgsError("Senha é obrigatório");
    if (!data.username) throw new InvalidArgsError("Username é obrigatório");

    if (data.nome.length < 3)
      throw new InvalidArgsError("Nome deve ter no mínimo 3 caracteres");
    if (data.username.length < 3)
      throw new InvalidArgsError("Username deve ter no mínimo 3 caracteres");
    if (data.senha.length < 6)
      throw new InvalidArgsError("Senha deve ter no mínimo 6 caracteres");
    if (data.email.length < 6)
      throw new InvalidArgsError("Email deve ter no mínimo 6 caracteres");
    if (data.nomeSocial && data.nomeSocial.length < 3)
      throw new InvalidArgsError("Nome social deve ter no mínimo 3 caracteres");

    if (!data.email.includes("@")) throw new InvalidArgsError("Email inválido");
  }

  async genPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(data: CadastroUserDto): Promise<SimplifiedUser> {
    this.validate(data);

    const user = await this.prisma.usuario.create({
      data: {
        nome: data.nome,
        nomeSocial: data.nomeSocial,
        email: data.email,
        username: data.username,
        password: await this.genPasswordHash(data.senha),
      },
    });

    return {
      id: user.id,
      username: user.username,
      isMei: false,
    };
  }

  async login(data: LoginDto): Promise<LoginResponse> {
    if (!data.username) throw new InvalidArgsError("Usuario é obrigatório");
    if (!data.senha) throw new InvalidArgsError("Senha é obrigatório");

    const user = await this.prisma.usuario.findFirst({
      where: {
        username: data.username,
      },
    });

    if (user) {
      const isValid = await bcrypt.compare(data.senha, user.password);
      if (isValid) {
        const payload: JwtPayload = {
          id: user.id,
          username: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!);

        return {
          token,
          user: {
            id: user.id,
            username: user.username,
            isMei: user.meiId !== null,
          },
        };
      }
    }

    throw new InvalidUserOrPassError();
  }
}

export default Login;
