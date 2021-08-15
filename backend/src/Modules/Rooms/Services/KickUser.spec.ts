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
import KickUser from './KickUser';
import Room from '../Infra/TypeORM/Entities/Room';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;
let joinRoom: JoinRoom;
let kickUser: KickUser;

describe('KickUser', () => {
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
    kickUser = new KickUser(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeJoinsRepository,
    );
  });

  it('should be able to kick a user out of a room', async () => {
    const deleteJoin = jest.spyOn(fakeJoinsRepository, 'delete');

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

    await kickUser.execute({
      actor: user,
      room_id: room.id,
      user_id: anotherUser.id,
    });

    expect(deleteJoin).toBeCalledWith(join.id);
  });

  it('should not be able to kick a user from a room that you are not a moderator', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await createUser.execute({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    expect(
      kickUser.execute({
        actor: user,
        room_id: 'another room id',
        user_id: anotherUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to kick a user from a room if the user does not particiapte of it', async () => {
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

    expect(
      kickUser.execute({
        actor: user,
        room_id: room.id,
        user_id: anotherUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
