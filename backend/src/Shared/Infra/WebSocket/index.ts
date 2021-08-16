import socketIO from 'socket.io';
import { Server } from 'http';
import { Handler, Request, Response, NextFunction } from 'express';

class WebSocket {
  private server: socketIO.Server;

  constructor() {
    this.server = new socketIO.Server({
      serveClient: false,
    });

    this.server.on('connection', socket => {
      console.log('a');
      socket.emit('connection');
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
