import 'reflect-metadata';

import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import FakeTokenProvider from 'Shared/Containers/Providers/TokenProvider/Fakes/FakeTokenProvider';
import AppError from 'Shared/Errors/AppError';
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository';
import CreateUser from './CreateUser';
import CreateUserSession from './CreateUserSession';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createUser: CreateUser;
let createUserSession: CreateUserSession;

describe('CreateUserSession', () => {
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
  });

  it('should be able to authenticate an user', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const authUser = await createUserSession.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    expect(authUser).toHaveProperty('token');
    expect(authUser.id).toBe(user.id);
  });

  it('should not be able to authenticate a non-existing user', async () => {
    expect(
      createUserSession.execute({
        nickname: 'I am not created yet',
        password: 'verysecretpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    expect(
      createUserSession.execute({
        nickname: user.nickname,
        password: 'incorrect password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
