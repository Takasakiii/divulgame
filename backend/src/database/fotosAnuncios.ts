import { PrismaClient } from "@prisma/client";
import { InconstantDataError } from ".";

export interface FotosSavedInfo {
  path: string;
  mimeType: string;
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
  ) {
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

    await Promise.all(promises);
  }
}

export default FotosAnuncios;
