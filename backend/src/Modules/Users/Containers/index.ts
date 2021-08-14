import { container } from 'tsyringe';

import IUsersRepository from '../Repositories/IUsersRepository';
import UsersRepository from '../Infra/TypeORM/Repositories/UsersRepository';

class UsersContainers {
  public execute(): void {
    container.registerSingleton<IUsersRepository>(
      'UsersRepository',
      UsersRepository,
    );
  }
}

export default UsersContainers;
