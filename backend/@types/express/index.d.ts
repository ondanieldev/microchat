import { Server } from 'socket.io';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';

declare global {
  namespace Express {
    interface Request {
      user: User;
      sockets: Server;
    }
  }
}
