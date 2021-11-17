import axios from "axios";

const baseURL = "http://localhost:2000";

export interface Login {
  usuario: string;
  password: string;
}

export interface SimplifiedUser {
  id: number;
  username: string;
  isMei: boolean;
}

export interface LoginResponse {
  token: string;
  user: SimplifiedUser;
}

export interface UsuarioDto {
  nome: string;
  nomeSocial?: string;
  email: string;
  senha: string;
  username: string;
}

export interface MeiDto {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
}

export enum TipoAnuncio {
  Produto,
  Servico,
}

export interface AnuncioDto {
  titulo: string;
  descricao: string;
  tipoAnuncio: TipoAnuncio;
}

export interface Anuncio {
  id: number;
  titulo: string;
  descricao: string;
  tipoAnuncio: TipoAnuncio;
  meiId: number;
}

export interface AnuncioForMany {
  id: number;
  titulo: string;
  descricao: string;
  tipo: TipoAnuncio;
  icone: number | null;
  user: {
    id: number;
    nomeFantasia: string;
  };
}

export interface UserAnuncio {
  id: number;
  nomeFantasia: string;
}
export interface AnuncioOne {
  id: number;
  titulo: string;
  descricao: string;
  tipo: TipoAnuncio;
  fotos: number[];
  user: UserAnuncio;
}

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export function fotoUrl(id: number): string {
  return `${baseURL}/images/${id}`;
}

export interface AvaliacaoDto {
  nota: number;
  comentario: string;
}

export function tipoAnuncioToString(tipo: TipoAnuncio): string {
  switch (tipo) {
    case TipoAnuncio.Produto:
      return "Produto";
    case TipoAnuncio.Servico:
      return "Serviço";
  }
}
