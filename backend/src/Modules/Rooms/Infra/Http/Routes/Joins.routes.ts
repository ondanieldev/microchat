import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import JoinsController from '../Controllers/JoinsController';

const joinsRoutes = Router();
const authMiddleware = new AuthMiddleware();
const joinsController = new JoinsController();

joinsRoutes.use('/', authMiddleware.execute);
joinsRoutes.post(
  '/kick',
  celebrate({
    [Segments.BODY]: {
      room_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  joinsController.kick,
);
joinsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      room_id: Joi.string().uuid().required(),
    },
  }),
  joinsController.join,
);
joinsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().uuid().required(),
    },
  }),
  joinsController.leave,
);

export default joinsRoutes;
