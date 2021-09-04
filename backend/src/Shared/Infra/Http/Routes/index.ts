import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import userSessionsRoutes from 'Modules/Users/Infra/Http/Routes/UserSessions.routes';
import roomsRoutes from 'Modules/Rooms/Infra/Http/Routes/Rooms.routes';
import roomsUsersRoutes from 'Modules/Rooms/Infra/Http/Routes/RoomsUsers.routes';
import messagesRoutes from 'Modules/Messages/Infra/Http/Routes/Messages.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users/sessions', userSessionsRoutes);
routes.use('/rooms', roomsRoutes);
routes.use('/rooms/users', roomsUsersRoutes);
routes.use('/messages', messagesRoutes);

export default routes;
