import { PrismaClient } from "@prisma/client";
import { InconstantDataError, InvalidArgsError } from ".";
import fs from "fs/promises";
import path from "path";

export interface FotosSavedInfo {
  path: string;
  mimeType: string;
}

export interface FotosAnunciosResponse {
  id: number;
}

class FotosAnuncios {
  private prisma: PrismaClient;

  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(
    idLoggedUser: number,
    idAnuncio: number,
    fotos: FotosSavedInfo[]
  ): Promise<FotosAnunciosResponse[]> {
    const anuncio = await this.prisma.anuncio.findFirst({
      where: { id: idAnuncio },
      include: {
        mei: {
          include: {
            usuario: true,
          },
        },
      },
    });

    if (!anuncio) {
      throw new InconstantDataError("Anuncio não existe");
    }

    if (anuncio.mei.usuario?.id !== idLoggedUser)
      throw new InconstantDataError("Você não tem permissão para fazer isso");

    const promises = fotos.map((foto) =>
      this.prisma.fotosAnuncios.create({
        data: {
          path: foto.path,
          mimeType: foto.mimeType,
          anuncioId: idAnuncio,
        },
      })
    );

    const prismaResponse = await Promise.all(promises);

    return prismaResponse.map((foto) => ({ id: foto.id }));
  }

  async getFoto(id: number): Promise<{ foto: Buffer; mimeType: string }> {
    const foto = await this.prisma.fotosAnuncios.findFirst({
      where: { id },
    });

    if (!foto) throw new InvalidArgsError("Foto não existe");

    const fotoBytes = await fs.readFile(
      path.join(__dirname, "..", "..", "uploads", foto.path)
    );

    return {
      foto: fotoBytes,
      mimeType: foto.mimeType,
    };
  }
}

export default FotosAnuncios;
