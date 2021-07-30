import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../Controllers/UsersController';

const usersRoutes = Router();
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

export default usersRoutes;
