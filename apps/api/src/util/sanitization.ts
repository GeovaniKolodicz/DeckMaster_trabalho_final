import {
  IUsuario,
  IUsuarioSemSenha,
} from "@nx-monorepo/comum";

export function sanitizarUsuario(usuario: IUsuario): IUsuarioSemSenha {
  const usuarioSanitizado = {
    ...usuario,
  };
  delete usuarioSanitizado.senha;
  return usuarioSanitizado;
}
