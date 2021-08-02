import { Router } from 'express';

import usersRoutes from 'Modules/Users/Infra/Http/Routes/Users.routes';
import userSessionsRoutes from 'Modules/Users/Infra/Http/Routes/UserSessions.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users/sessions', userSessionsRoutes);

export default routes;
