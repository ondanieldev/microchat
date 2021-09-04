import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import { Server } from 'http';
import { configure, getLogger } from 'log4js';
import { errors as celebrateMiddleware } from 'celebrate';

import routes from './Routes';
import TypeORM from '../TypeORM';
import WebSocket from '../WebSocket';
import Containers from '../../Containers';
import ErrorsMiddleware from './Middlewares/ErrorsMiddleware';
import RateLimitMiddleware from './Middlewares/RateLimitMiddleware';

configure(
  `src/Config/log4js-${
    process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  }.json`,
);

const port = process.env.PORT || 3333;
const logger = getLogger('server');
const app = express();
const server = new Server(app);
const typeORM = new TypeORM();
const webSocket = new WebSocket();
const containers = new Containers();
const errorsMiddleware = new ErrorsMiddleware();
const rateLimitMiddleware = new RateLimitMiddleware();

typeORM.execute().then(() => {
  containers.execute();
  app.use(webSocket.execute(server));
  app.use(rateLimitMiddleware.execute());
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(celebrateMiddleware());
  app.use(errorsMiddleware.execute);
});

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
