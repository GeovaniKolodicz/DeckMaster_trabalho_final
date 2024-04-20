import * as jsonWebToken from 'jsonwebtoken';

import { Request, expressjwt } from 'express-jwt';

import {
  IUsuario,
  IUsuarioJwt,
} from '@nx-monorepo/comum';

import { sanitizarUsuario } from './sanitization';

const JWT_SECRET_KEY = 'Ch4v3-s3Cr3t4';

export function criarToken(usuario: IUsuario): string {
  return jsonWebToken.sign(
    sanitizarUsuario(usuario),  // PAYLOAD
    JWT_SECRET_KEY,             // SENHA (CHAVE PRIVADA DO BACK END)
    {
      expiresIn: '10m',
    },
  );
}

export const verificarTokenJwt = expressjwt({
  secret: JWT_SECRET_KEY,
  algorithms: ['HS256'],
});

export type AuthorizedRequest = Request<IUsuarioJwt>;
