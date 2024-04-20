import { Application } from "express";

import { Collection, Db } from "mongodb";

/**
 * Retorna uma referência para uma coleção do banco de dados,
 * dada como entrada uma referência para a nossa aplicação
 * ExpressJS.
 */
export function getCollection<T>(
  app: Application,
  nome: string,
): Collection<T> {
  const db: Db = app.locals.db;
  return db.collection(nome);
}
