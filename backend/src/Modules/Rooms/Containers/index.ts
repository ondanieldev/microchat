import { container } from 'tsyringe';

import IRoomsRepository from '../Repositories/IRoomsRepository';
import RoomsRepository from '../Infra/TypeORM/Repositories/RoomsRepository';
import IJoinsRepository from '../Repositories/IJoinsRepository';
import JoinsRepository from '../Infra/TypeORM/Repositories/JoinsRepository';

class RoomsContainers {
  public execute(): void {
    container.registerSingleton<IRoomsRepository>(
      'RoomsRepository',
      RoomsRepository,
    );

    container.registerSingleton<IJoinsRepository>(
      'JoinsRepository',
      JoinsRepository,
    );
  }
}

export default RoomsContainers;
