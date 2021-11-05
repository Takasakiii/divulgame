import { PrismaClient, Usuario } from "@prisma/client";
import { InvalidArgsError } from "./Api";

export interface LoginDto {
  nome: string;
  nomeSocial?: string;
  email: string;
  senha: string;
  username: string;
}

class Login {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private validate(data: LoginDto) {
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

  async create(data: LoginDto): Promise<Usuario> {
    this.validate(data);

    const user = await this.prisma.usuario.create({
      data: {
        nome: data.nome,
        nomeSocial: data.nomeSocial,
        email: data.email,
        username: data.username,
        password: data.senha,
        salt: "",
      },
    });

    return user;
  }
}

export default Login;
