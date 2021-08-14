import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import ITokenProvider from 'Shared/Containers/Providers/TokenProvider/Models/ITokenProvider';
import User from '../Infra/TypeORM/Entities/User';
import IUsersRepository from '../Repositories/IUsersRepository';

@injectable()
class AuthenticateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<User> {
    const data = this.tokenProvider.verify(token);

    const user = await this.usersRepository.findOne({
      id: data.subject,
    });
    if (!user || user.token !== token) {
      throw new AppError(
        'You are not authorized to access this resource!',
        403,
      );
    }

    return user;
  }
}

export default AuthenticateUser;
