import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import UsersController from '../Controllers/UsersController';

const usersRoutes = Router();
const authMiddleware = new AuthMiddleware();
const usersController = new UsersController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nickname: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoutes.get('/me', authMiddleware.execute, usersController.showCurrent);

export default usersRoutes;
