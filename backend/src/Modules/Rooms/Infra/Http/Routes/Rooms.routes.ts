import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import RoomsController from '../Controllers/RoomsController';

const roomsRoutes = Router();
const authMiddleware = new AuthMiddleware();
const roomsController = new RoomsController();

roomsRoutes.use('/', authMiddleware.execute);
roomsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  roomsController.create,
);
roomsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      page: Joi.number().min(1).required(),
      limit: Joi.number().min(1).max(100).required(),
    },
  }),
  roomsController.index,
);

export default roomsRoutes;
