import { PrismaClient, Anuncio as PrismaAnuncio } from "@prisma/client";
import { InvalidArgsError, InconstantDataError } from ".";

export enum TipoAnuncio {
  Produto,
  Servico,
}

export class AnuncioDto {
  titulo: string;
  descricao: string;
  tipoAnuncio: TipoAnuncio;

  constructor({ titulo, descricao, tipoAnuncio }: AnuncioDto) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.tipoAnuncio = tipoAnuncio;
    this.validate();
  }

  validate() {
    if (!this.titulo) throw new InvalidArgsError("Titulo é obrigatório");
    if (!this.descricao) throw new InvalidArgsError("Descrição é obrigatório");
    if (this.tipoAnuncio < 0 || this.tipoAnuncio > 1)
      throw new InvalidArgsError("Tipo de anúncio inválido");
    if (this.titulo.length < 5)
      throw new InvalidArgsError("Titulo muito curto");
    if (this.descricao.length < 10)
      throw new InvalidArgsError("Descrição muito curta");
  }
}

class Anuncio {
  private prisma: PrismaClient;

  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(data: AnuncioDto, userId: number): Promise<PrismaAnuncio> {
    const userData = await this.prisma.usuario.findFirst({
      where: { id: userId },
    });

    if (!userData) throw new InconstantDataError("Usuário não encontrado");
    if (!userData.meiId) throw new InconstantDataError("Usuário não é MEI");

    const anuncio = await this.prisma.anuncio.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        tipoAnuncio: data.tipoAnuncio,
        meiId: userData.meiId,
      },
    });

    return anuncio;
  }
}

export default Anuncio;
