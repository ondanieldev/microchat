import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { configure, getLogger } from 'log4js';

import routes from './Routes';
import TypeORM from '../TypeORM';
import Containers from '../../Containers';

configure(
  `src/Config/log4js-${
    process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  }.json`,
);

const port = process.env.PORT || 3333;
const app = express();
const typeORM = new TypeORM();
const containers = new Containers();
const logger = getLogger('server');

typeORM.execute().then(() => {
  containers.execute();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
