import { container } from 'tsyringe';

import IRoomsRepository from '../Repositories/IRoomsRepository';
import RoomsRepository from '../Infra/TypeORM/Repositories/RoomsRepository';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';
import RoomsUsersRepository from '../Infra/TypeORM/Repositories/RoomsUsersRepository';

class RoomsContainers {
  public execute(): void {
    container.registerSingleton<IRoomsRepository>(
      'RoomsRepository',
      RoomsRepository,
    );

    container.registerSingleton<IRoomsUsersRepository>(
      'RoomsUsersRepository',
      RoomsUsersRepository,
    );
  }
}

export default RoomsContainers;
