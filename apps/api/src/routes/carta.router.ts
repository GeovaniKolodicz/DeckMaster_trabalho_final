import {
  NextFunction,
  Request,
  Response,
  Router,
} from "express";

import { ICarta } from "@nx-monorepo/comum";

import { getCollection } from "../util/get-collection";
import { AuthorizedRequest, verificarTokenJwt } from "../util/jwt";

export const cartaRouter = Router();

cartaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const cartas: ICarta[] = await getCollection<ICarta>(
    req.app,
    'cartas',
  ).find().toArray();
  res.json(cartas);
});

cartaRouter.use(verificarTokenJwt);

cartaRouter.get('/:_id', async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const _id: number = +req.params._id;

  const carta: ICarta = await getCollection<ICarta>(
    req.app,
    'cartas',
  ).findOne({
    _id: _id,
  });
  res.json(carta);
});

cartaRouter.put('/:_id', async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const _id: number = +req.params._id;
  const carta: ICarta = req.body;
  const resultado: ICarta = await getCollection<ICarta>(
    req.app,
    'cartas',
  ).findOneAndReplace({
    _id: _id,
  }, carta);

  if (resultado) {
    res.json(carta);
  } else {
    return next(new Error(`Carta com ID ${_id} não encontrado!`));
  }

});

cartaRouter.post('/', async (req: AuthorizedRequest, res: Response, next: NextFunction) => {

  const carta: ICarta = req.body;

  const maxId = await getCollection<ICarta>(
    req.app,
    'cartas',
  ).find().sort({ _id: -1 }).limit(1).toArray();
  const newId: number = (!maxId || maxId.length < 1) ? 1 : maxId[0]._id + 1;

  carta._id = newId;

  const resultado = await getCollection<ICarta>(
    req.app,
    'cartas',
  ).insertOne(carta);

  if (resultado.acknowledged) {
    res.json(carta);
  } else {
    return next(new Error(`Não foi possível criar a carta!`));
  }

});

cartaRouter.delete('/:_id', async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const _id: number = +req.params._id;

  try {
    // Verificar se a carta existe antes de excluir
    const carta: ICarta = await getCollection<ICarta>(req.app, 'cartas').findOne({ _id: _id });
    if (!carta) {
      return res.status(404).json({ message: `Carta com ID ${_id} não encontrada.` });
    }

    // Excluir a carta
    const resultado = await getCollection<ICarta>(req.app, 'cartas').deleteOne({ _id: _id });
    if (resultado.deletedCount === 1) {
      // Carta excluída com sucesso
      res.status(200).json({ message: `Carta com ID ${_id} excluída com sucesso.` });
    } else {
      // A exclusão falhou por algum motivo desconhecido
      return res.status(500).json({ message: `Falha ao excluir carta com ID ${_id}.` });
    }
  } catch (error) {
    // Lidar com erros
    next(error);
  }
});
