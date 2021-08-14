import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { configure, getLogger } from 'log4js';
import { errors as celebrateMiddleware } from 'celebrate';

import routes from './Routes';
import TypeORM from '../TypeORM';
import Containers from '../../Containers';
import ErrorsMiddleware from './Middlewares/ErrorsMiddleware';

configure(
  `src/Config/log4js-${
    process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  }.json`,
);

const port = process.env.PORT || 3333;
const logger = getLogger('server');
const app = express();
const typeORM = new TypeORM();
const containers = new Containers();
const errorsMiddleware = new ErrorsMiddleware();

typeORM.execute().then(() => {
  containers.execute();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(celebrateMiddleware());
  app.use(errorsMiddleware.execute);
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
