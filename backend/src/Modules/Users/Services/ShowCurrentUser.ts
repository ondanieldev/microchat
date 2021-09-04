import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from '../Infra/TypeORM/Entities/User';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class ShowCurrentUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(actor: User): Promise<User> {
    const user = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return user;
  }
}

export default ShowCurrentUser;
