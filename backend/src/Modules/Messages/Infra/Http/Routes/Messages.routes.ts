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

export default messagesRoutes;
