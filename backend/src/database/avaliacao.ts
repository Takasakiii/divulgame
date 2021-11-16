import { PrismaClient } from "@prisma/client";
import { InvalidArgsError } from ".";

export class AvaliacaoDto {
  nota: number;
  comentario: string;

  constructor({ nota, comentario }: AvaliacaoDto) {
    this.nota = nota;
    this.comentario = comentario;
    this.validar();
  }

  validar() {
    if (this.nota < 0 || this.nota > 10) {
      throw new InvalidArgsError("Nota inválida");
    }

    if (this.comentario.length < 10) {
      throw new InvalidArgsError("Comentário muito curto");
    }
  }
}

class Avaliacao {
  private prisma: PrismaClient;

  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(usuarioId: number, anuncioId: number, avaliacao: AvaliacaoDto) {
    const avaliacaoCriada = await this.prisma.avaliacao.create({
      data: {
        cometario: avaliacao.comentario,
        nota: avaliacao.nota,
        autorId: usuarioId,
        anuncioId: anuncioId,
      },
    });

    return avaliacaoCriada;
  }
}

export default Avaliacao;
