import { createConnection } from 'typeorm';
import { getLogger } from 'log4js';

const logger = getLogger('server');

class TypeORM {
  public async execute(): Promise<void> {
    try {
      await createConnection();
      logger.info('Postgresql connected successfully');
    } catch (err) {
      logger.error('Postgresql not connected successfully');
    }
  }
}

export default TypeORM;
