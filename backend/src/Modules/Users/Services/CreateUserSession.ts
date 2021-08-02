import { inject, injectable } from 'tsyringe';

import IHashProvider from 'Shared/Containers/Providers/HashProvider/Models/IHashProvider';
import AppError from 'Shared/Errors/AppError';
import ITokenProvider from 'Shared/Containers/Providers/TokenProvider/Models/ITokenProvider';
import User from '../Infra/TypeORM/Entities/User';
import IUsersRepository from '../Repositories/IUsersRepository';

interface IRequest {
  nickname: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ nickname, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOne({
      nickname,
    });
    if (!user) {
      throw new AppError('Wrong credentials!', 403);
    }

    const checkIfPasswordIsCorrrect = await this.hashProvider.compare(
      password,
      user.password,
    );
    if (!checkIfPasswordIsCorrrect) {
      throw new AppError('Wrong credentials!', 403);
    }

    const token = this.tokenProvider.generate(user.id);

    return { user, token };
  }
}

export default AuthenticateUserService;
