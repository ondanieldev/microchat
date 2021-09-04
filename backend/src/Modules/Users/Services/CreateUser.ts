import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import IHashProvider from 'Shared/Containers/Providers/HashProvider/Models/IHashProvider';
import IUsersRepository from '../Repositories/IUsersRepository';
import ICreateUser from '../DTOs/ICreateUser';
import User from '../Infra/TypeORM/Entities/User';

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ nickname, password }: ICreateUser): Promise<User> {
    const exists = await this.usersRepository.findOne({
      nickname,
    });
    if (exists) {
      throw new AppError(
        'This nickname is already in use! Please, pick another one.',
      );
    }

    const hashedPassword = await this.hashProvider.generate(password);

    return this.usersRepository.create({
      nickname,
      password: hashedPassword,
    });
  }
}

export default CreateUser;
