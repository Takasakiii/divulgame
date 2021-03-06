import { PrismaClient } from "@prisma/client";
import { InvalidArgsError, InvalidEnvConfigError } from "./";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const passwordUtils = {
  hashPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  comparePassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  },
};

export class UsuarioDto {
  nome: string;
  nomeSocial?: string;
  email: string;
  senha: string;
  username: string;

  constructor({ nome, nomeSocial, email, senha, username }: UsuarioDto) {
    this.nome = nome;
    this.nomeSocial = nomeSocial;
    this.email = email;
    this.senha = senha;
    this.username = username;

    this.validate();
  }

  validate() {
    if (!this.nome) throw new InvalidArgsError("Nome é obrigatório");
    if (!this.email) throw new InvalidArgsError("Email é obrigatório");
    if (!this.senha) throw new InvalidArgsError("Senha é obrigatório");
    if (!this.username) throw new InvalidArgsError("Username é obrigatório");

    if (this.nome.length < 3)
      throw new InvalidArgsError("Nome deve ter no mínimo 3 caracteres");
    if (this.username.length < 3)
      throw new InvalidArgsError("Username deve ter no mínimo 3 caracteres");
    if (this.senha.length < 6)
      throw new InvalidArgsError("Senha deve ter no mínimo 6 caracteres");
    if (this.email.length < 6)
      throw new InvalidArgsError("Email deve ter no mínimo 6 caracteres");
    if (this.nomeSocial && this.nomeSocial.length < 3)
      throw new InvalidArgsError("Nome social deve ter no mínimo 3 caracteres");

    if (!this.email.includes("@")) throw new InvalidArgsError("Email inválido");
  }
}

export interface SimplifiedUser {
  id: number;
  username: string;
  isMei: boolean;
}

export class Login {
  usuario: string;
  password: string;

  constructor({ usuario, password }: Login) {
    this.usuario = usuario;
    this.password = password;

    this.validate();
  }

  validate() {
    if (!this.usuario) throw new InvalidArgsError("Usuário é obrigatório");
    if (!this.password) throw new InvalidArgsError("Senha é obrigatório");
  }
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

export class MeiDto {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;

  constructor({ cnpj, nomeFantasia, razaoSocial }: MeiDto) {
    this.cnpj = cnpj;
    this.nomeFantasia = nomeFantasia;
    this.razaoSocial = razaoSocial;

    this.validate();
  }

  validate() {
    if (!this.cnpj) throw new InvalidArgsError("CNPJ é obrigatório");
    if (!this.nomeFantasia)
      throw new InvalidArgsError("Nome fantasia é obrigatório");
    if (!this.razaoSocial)
      throw new InvalidArgsError("Razão social é obrigatório");

    if (this.cnpj.length != 14)
      throw new InvalidArgsError("CNPJ deve ter 14 caracteres");
    if (this.nomeFantasia.length < 3)
      throw new InvalidArgsError(
        "Nome fantasia deve ter no mínimo 3 caracteres"
      );
    if (this.razaoSocial.length < 3)
      throw new InvalidArgsError(
        "Razão social deve ter no mínimo 3 caracteres"
      );
  }
}

class Usuario {
  private prisma: PrismaClient;

  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(user: UsuarioDto): Promise<SimplifiedUser> {
    const userFinal = await this.prisma.usuario.create({
      data: {
        username: user.username,
        nome: user.nome,
        nomeSocial: user.nomeSocial,
        email: user.email,
        password: await passwordUtils.hashPassword(user.senha),
      },
    });

    return {
      isMei: false,
      username: userFinal.username,
      id: userFinal.id,
    };
  }

  async login(loginDto: Login) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        username: loginDto.usuario,
      },
    });

    if (user) {
      const isValid = await bcrypt.compare(loginDto.password, user.password);
      if (isValid) {
        const payload: JwtPayload = {
          id: user.id,
          username: user.username,
        };

        if (!process.env.JWT_SECRET)
          throw new InvalidEnvConfigError("JWT_SECRET ausente");

        const token = jwt.sign(payload, process.env.JWT_SECRET);

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

  async addMeiData(idUsuario: number, meiDto: MeiDto) {
    const mei = await this.prisma.mei.create({
      data: {
        cnpj: meiDto.cnpj,
        nomeFantasia: meiDto.nomeFantasia,
        razaoSocial: meiDto.razaoSocial,
      },
    });

    await this.prisma.usuario.update({
      data: {
        meiId: mei.id,
      },
      where: {
        id: idUsuario,
      },
    });
  }
}

export default Usuario;
