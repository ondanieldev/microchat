import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import CreateUser from 'Modules/Users/Services/CreateUser';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import CreateRoom from './CreateRoom';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;

describe('CreateRoom', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createRoom = new CreateRoom(fakeRoomsRepository, fakeUsersRepository);
  });

  it('should be able to create a new room', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await createRoom.execute({
      actor: user,
      data: {
        name: 'My friends',
      },
    });

    expect(room).toHaveProperty('id');
  });

  it('should not be able to create a new room if the moderator does not exist', async () => {
    const invalidUser = new User();

    expect(
      createRoom.execute({
        actor: invalidUser,
        data: {
          name: 'My friends',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
