import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import userSessionsRoutes from 'Modules/Users/Infra/Http/Routes/UserSessions.routes';
import roomsRoutes from 'Modules/Rooms/Infra/Http/Routes/Rooms.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users/sessions', userSessionsRoutes);
routes.use('/rooms', roomsRoutes);

export default routes;
