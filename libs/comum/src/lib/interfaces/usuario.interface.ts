import { JwtPayload } from 'jsonwebtoken';

export interface IUsuario {

  _id: number;

  login: string;

  senha: string;

  nome: string;

  administrador: boolean;

}

export type IUsuarioSemSenha = Omit<IUsuario, 'senha'>;
export type IUsuarioESenha = Pick<IUsuario, 'login' | 'senha'>;
export type IUsuarioJwt = IUsuarioSemSenha & JwtPayload;
export interface IUsuarioLogado {

  jwt: string;

  usuario: IUsuarioSemSenha;

}
