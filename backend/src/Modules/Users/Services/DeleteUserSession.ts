import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from '../Infra/TypeORM/Entities/User';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class DeleteUserSession {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(actor: User): Promise<void> {
    const user = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    user.token = undefined;
    await this.usersRepository.save(user);
  }
}

export default DeleteUserSession;
