import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import userSessionsRoutes from 'Modules/Users/Infra/Http/Routes/UserSessions.routes';
import roomsRoutes from 'Modules/Rooms/Infra/Http/Routes/Rooms.routes';
import joinsRoutes from 'Modules/Rooms/Infra/Http/Routes/Joins.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users/sessions', userSessionsRoutes);
routes.use('/rooms', roomsRoutes);
routes.use('/rooms/joins', joinsRoutes);

export default routes;
