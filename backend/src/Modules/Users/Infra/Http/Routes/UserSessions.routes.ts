import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import UserSessionsController from '../Controllers/UserSessionsController';

const userSessionsRoutes = Router();
const authMiddleware = new AuthMiddleware();
const userSessionsController = new UserSessionsController();

userSessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nickname: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userSessionsController.create,
);

userSessionsRoutes.use('/', authMiddleware.execute);
userSessionsRoutes.delete('/', userSessionsController.delete);

export default userSessionsRoutes;
