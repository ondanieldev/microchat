import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository';
import CreateUser from './CreateUser';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const passwordIsHashed = await fakeHashProvider.compare(
      'verysecretpassword',
      user.password,
    );

    expect(user).toHaveProperty('id');
    expect(passwordIsHashed).toBe(true);
  });

  it('should not be able to create a new user with a nickname that is already in use', async () => {
    await createUser.execute({
      nickname: 'The same user',
      password: 'verysecretpassword',
    });

    await expect(
      createUser.execute({
        nickname: 'The same user',
        password: 'ultrasecretpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
