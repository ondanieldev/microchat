import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import MessagesController from '../Controllers/MessagesController';

const messagesRoutes = Router();
const authMiddleware = new AuthMiddleware();
const messagesController = new MessagesController();

messagesRoutes.use('/', authMiddleware.execute);
messagesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
      room_id: Joi.string().uuid().required(),
    },
  }),
  messagesController.create,
);
messagesRoutes.get(
  '/:room_id',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      limit: Joi.number().min(0).max(100).required(),
      cursor: Joi.string().uuid(),
    },
  }),
  messagesController.index,
);

export default messagesRoutes;
