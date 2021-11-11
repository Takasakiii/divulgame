import axios from "axios";

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

export const api = axios.create({
  baseURL: "http://localhost:2000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
