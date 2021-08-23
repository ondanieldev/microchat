import socketIO from 'socket.io';
import { Server } from 'http';
import { Handler, Request, Response, NextFunction } from 'express';
import AuthenticateUser from 'Modules/Users/Services/AuthenticateUser';
import { container } from 'tsyringe';

class WebSocket {
  private server: socketIO.Server;

  constructor() {
    this.server = new socketIO.Server({
      serveClient: false,
    });

    this.server.on('connection', async socket => {
      const { token } = socket.handshake.auth;

      const authenticateUser = container.resolve(AuthenticateUser);
      try {
        await authenticateUser.execute(token);
      } catch (err) {
        socket.emit('error', err);
        return;
      }
      socket.emit('connection');

      socket.on('room.join', data => {
        if (!data || !data.room_id) {
          socket.emit('error', {
            message: 'Romm not found!',
            statusCode: 404,
          });
          return;
        }
        socket.join(data.room_id);
      });
    });
  }

  public execute(http: Server): Handler {
    this.server.attach(http, {
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
    });

    return (request: Request, _response: Response, next: NextFunction) => {
      request.sockets = this.server;
      next();
    };
  }
}

export default WebSocket;
