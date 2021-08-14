import 'reflect-metadata';

import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import FakeTokenProvider from 'Shared/Containers/Providers/TokenProvider/Fakes/FakeTokenProvider';
import AppError from 'Shared/Errors/AppError';
import User from '../Infra/TypeORM/Entities/User';
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository';
import CreateUser from './CreateUser';
import CreateUserSession from './CreateUserSession';
import DeleteUserSession from './DeleteUserSession';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createUser: CreateUser;
let createUserSession: CreateUserSession;
let deleteUserSession: DeleteUserSession;

describe('DeleteUserSession', () => {
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

    deleteUserSession = new DeleteUserSession(fakeUsersRepository);
  });

  it('should be able to delete user session', async () => {
    await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const authUser = await createUserSession.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    await deleteUserSession.execute(authUser);

    const user = await fakeUsersRepository.findOne({
      id: authUser.id,
    });

    expect(user?.token).toBeUndefined();
  });

  it('should not be able to delete a session of a non-existing user', async () => {
    const user = new User();

    expect(deleteUserSession.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
