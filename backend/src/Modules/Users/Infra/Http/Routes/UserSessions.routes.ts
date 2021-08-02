import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserSessionsController from '../Controllers/UserSessionsController';

const userSessionsRoutes = Router();
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

export default userSessionsRoutes;
