import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import userSessionsRoutes from 'Modules/Users/Infra/Http/Routes/UserSessions.routes';
import roomsRoutes from 'Modules/Rooms/Infra/Http/Routes/Rooms.routes';
import roomsUsersRoutes from 'Modules/Rooms/Infra/Http/Routes/RoomsUsers.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users/sessions', userSessionsRoutes);
routes.use('/rooms', roomsRoutes);
routes.use('/rooms/users', roomsUsersRoutes);

export default routes;
