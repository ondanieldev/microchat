import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import User from '../Infra/TypeORM/Entities/User';
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository';
import ShowCurrentUser from './ShowCurrentUser';

let fakeUsersRepository: FakeUsersRepository;
let showCurrentUser: ShowCurrentUser;

describe('ShowCurrentUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showCurrentUser = new ShowCurrentUser(fakeUsersRepository);
  });

  it('should be able to show the current user data', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const currentData = await showCurrentUser.execute(user);

    expect(currentData.id).toBe(user.id);
  });

  it('should not be able to show current user data if the user does not exist', async () => {
    const user = new User();

    expect(showCurrentUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
