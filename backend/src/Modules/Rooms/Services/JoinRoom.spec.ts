import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import CreateUser from 'Modules/Users/Services/CreateUser';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeJoinsRepository from '../Repositories/Fakes/FakeJoinsRepository';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Room from '../Infra/TypeORM/Entities/Room';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;
let joinRoom: JoinRoom;

describe('JoinRoom', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeJoinsRepository = new FakeJoinsRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createRoom = new CreateRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeJoinsRepository,
    );
    joinRoom = new JoinRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeJoinsRepository,
    );
  });

  it('should be able to enter a room', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await createUser.execute({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    const room = await createRoom.execute({
      actor: user,
      data: {
        name: 'My friends',
      },
    });

    const join = await joinRoom.execute({
      actor: anotherUser,
      data: {
        room_id: room.id,
      },
    });

    expect(join.user_id).toBe(anotherUser.id);
    expect(join.room_id).toBe(room.id);
  });

  it('should not be able to enter a room if the user does not exist', async () => {
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

    const invalidUser = new User();

    expect(
      joinRoom.execute({
        actor: invalidUser,
        data: {
          room_id: room.id,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to enter a non-existing room', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const invalidRoom = new Room();

    expect(
      joinRoom.execute({
        actor: user,
        data: {
          room_id: invalidRoom.id,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
