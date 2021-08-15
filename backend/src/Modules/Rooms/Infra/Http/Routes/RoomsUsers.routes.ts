import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthMiddleware from 'Shared/Infra/Http/Middlewares/AuthMiddleware';
import RoomsUsersController from '../Controllers/RoomsUsersController';

const roomsUsersRoutes = Router();
const authMiddleware = new AuthMiddleware();
const roomsUsersController = new RoomsUsersController();

roomsUsersRoutes.use('/', authMiddleware.execute);
roomsUsersRoutes.post(
  '/kick',
  celebrate({
    [Segments.BODY]: {
      room_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  roomsUsersController.kick,
);
roomsUsersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      room_id: Joi.string().uuid().required(),
    },
  }),
  roomsUsersController.join,
);
roomsUsersRoutes.delete(
  '/:room_id',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().uuid().required(),
    },
  }),
  roomsUsersController.leave,
);
roomsUsersRoutes.get(
  '/:room_id',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().uuid().required(),
    },
  }),
  roomsUsersController.index,
);

export default roomsUsersRoutes;
