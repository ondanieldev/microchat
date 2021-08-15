import { container } from 'tsyringe';

import IRoomsRepository from '../Repositories/IRoomsRepository';
import RoomsRepository from '../Infra/TypeORM/Repositories/RoomsRepository';

class RoomsContainers {
  public execute(): void {
    container.registerSingleton<IRoomsRepository>(
      'RoomsRepository',
      RoomsRepository,
    );
  }
}

export default RoomsContainers;
