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
