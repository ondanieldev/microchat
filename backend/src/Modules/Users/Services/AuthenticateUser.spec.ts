import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import FakeTokenProvider from 'Shared/Containers/Providers/TokenProvider/Fakes/FakeTokenProvider';
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository';
import CreateUser from './CreateUser';
import CreateUserSession from './CreateUserSession';
import AuthenticateUser from './AuthenticateUser';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createUser: CreateUser;
let createUserSession: CreateUserSession;
let authenticateUser: AuthenticateUser;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createUserSession = new CreateUserSession(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
    authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeTokenProvider,
    );
  });

  it('should be able to authenticate the user', async () => {
    await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const user = await createUserSession.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const authUser = await authenticateUser.execute(user.token || '');

    expect(authUser.id).toBe(user.id);
  });

  it('should not be able to authenticate an user wth invalid token', async () => {
    await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    expect(authenticateUser.execute('invalid_token')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
