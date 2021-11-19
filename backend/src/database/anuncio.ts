import { PrismaClient, Anuncio as PrismaAnuncio } from "@prisma/client";
import {
  InvalidArgsError,
  InconstantDataError,
  NotFoundError,
  UnauthorizedError,
} from ".";
import fs from "fs/promises";
import path from "path";

export enum TipoAnuncio {
  Produto,
  Servico,
}

export interface UserAnuncio {
  id: number;
  nomeFantasia: string;
}
export interface AnuncioForMany {
  id: number;
  titulo: string;
  descricao: string;
  tipo: TipoAnuncio;
  icone: number | null;
  user: UserAnuncio;
}

export interface AnuncioOne {
  id: number;
  titulo: string;
  descricao: string;
  tipo: TipoAnuncio;
  fotos: number[];
  user: UserAnuncio;
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

  async findAll(): Promise<AnuncioForMany[]> {
    const anuncios = await this.prisma.anuncio.findMany({
      include: {
        mei: {
          include: {
            usuario: true,
          },
        },
        fotos: true,
      },
    });

    const result: AnuncioForMany[] = anuncios.map((anuncio) => {
      if (!anuncio.mei) throw new InconstantDataError("Anúncio sem MEI");
      if (!anuncio.mei.usuario)
        throw new InconstantDataError("Anúncio sem Usuário");

      return {
        id: anuncio.id,
        titulo: anuncio.titulo,
        descricao: anuncio.descricao,
        tipo: anuncio.tipoAnuncio,
        user: {
          id: anuncio.mei.usuario.id,
          nomeFantasia: anuncio.mei.nomeFantasia,
        },
        icone: anuncio.fotos.length > 0 ? anuncio.fotos[0].id : null,
      };
    });

    return result;
  }

  async find(search: string): Promise<AnuncioForMany[]> {
    const anuncios = await this.prisma.anuncio.findMany({
      include: {
        mei: {
          include: {
            usuario: true,
          },
        },
        fotos: true,
      },
      where: {
        OR: [
          {
            titulo: {
              contains: search,
            },
          },
          {
            descricao: { contains: search },
          },
        ],
      },
    });

    const result: AnuncioForMany[] = anuncios.map(
      ({
        id,
        mei: { usuario, nomeFantasia },
        descricao,
        fotos,
        titulo,
        tipoAnuncio,
      }) => {
        if (!usuario) throw new InconstantDataError("Anúncio sem Usuário");

        return {
          id,
          descricao,
          titulo,
          icone: fotos.length > 0 ? fotos[0].id : null,
          tipo: tipoAnuncio,
          user: {
            id: usuario.id,
            nomeFantasia,
          },
        };
      }
    );

    return result;
  }

  async get(id: number): Promise<AnuncioOne> {
    const anuncio = await this.prisma.anuncio.findFirst({
      where: {
        id,
      },
      include: {
        mei: {
          include: {
            usuario: true,
          },
        },
        fotos: true,
      },
    });

    if (!anuncio) throw new NotFoundError("Anúncio não encontrado");
    if (!anuncio.mei) throw new InconstantDataError("Anúncio sem MEI");
    if (!anuncio.mei.usuario)
      throw new InconstantDataError("Anúncio sem Usuário");

    return {
      id: anuncio.id,
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      tipo: anuncio.tipoAnuncio,
      fotos: anuncio.fotos.map((foto) => foto.id),
      user: {
        id: anuncio.mei.usuario.id,
        nomeFantasia: anuncio.mei.nomeFantasia,
      },
    };
  }

  async findByUser(userId: number): Promise<AnuncioForMany[]> {
    const anuncios = await this.prisma.anuncio.findMany({
      where: {
        mei: {
          usuario: {
            id: userId,
          },
        },
      },
      include: {
        mei: {
          include: { usuario: true },
        },
        fotos: true,
      },
    });

    const result: AnuncioForMany[] = anuncios.map((anuncio) => {
      if (!anuncio.mei) throw new InconstantDataError("Anúncio sem MEI");
      if (!anuncio.mei.usuario)
        throw new InconstantDataError("Anúncio sem Usuário");

      return {
        id: anuncio.id,
        titulo: anuncio.titulo,
        descricao: anuncio.descricao,
        tipo: anuncio.tipoAnuncio,
        user: {
          id: anuncio.mei.usuario.id,
          nomeFantasia: anuncio.mei.nomeFantasia,
        },
        icone: anuncio.fotos.length > 0 ? anuncio.fotos[0].id : null,
      };
    });

    return result;
  }

  async remove(id: number, authorId: number) {
    const anuncio = await this.prisma.anuncio.findFirst({
      where: {
        id,
      },
      include: {
        mei: {
          include: {
            usuario: true,
          },
        },
        fotos: true,
        comentarios: true,
      },
    });

    if (!anuncio) throw new NotFoundError("Anúncio não encontrado");
    if (anuncio.mei.usuario?.id !== authorId)
      throw new UnauthorizedError("Usuário não autorizado");

    if (anuncio.comentarios.length > 0) {
      await this.prisma.avaliacao.deleteMany({
        where: {
          anuncioId: id,
        },
      });
    }

    if (anuncio.fotos.length > 0) {
      const fotosFilesPromises = anuncio.fotos.map(
        async ({ path: pathFoto }) => {
          await fs.unlink(
            path.join(__dirname, "..", "..", "uploads", pathFoto)
          );
        }
      );

      await Promise.all(fotosFilesPromises);

      await this.prisma.fotosAnuncios.deleteMany({
        where: {
          anuncioId: id,
        },
      });
    }

    await this.prisma.anuncio.delete({
      where: {
        id,
      },
    });
  }

  async removeFoto(idFoto: number, authorId: number) {
    const foto = await this.prisma.fotosAnuncios.findFirst({
      where: {
        id: idFoto,
      },
      include: {
        anuncio: {
          include: {
            mei: {
              include: {
                usuario: true,
              },
            },
          },
        },
      },
    });

    if (!foto) throw new NotFoundError("Foto não encontrada");
    if (foto.anuncio.mei.usuario?.id !== authorId)
      throw new UnauthorizedError("Usuário não autorizado");

    await fs.unlink(path.join(__dirname, "..", "..", "uploads", foto.path));

    await this.prisma.fotosAnuncios.delete({
      where: {
        id: idFoto,
      },
    });
  }
}

export default Anuncio;
