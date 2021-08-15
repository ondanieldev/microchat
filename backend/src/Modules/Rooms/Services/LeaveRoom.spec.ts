import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import CreateUser from 'Modules/Users/Services/CreateUser';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import LeaveRoom from './LeaveRoom';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;
let joinRoom: JoinRoom;
let leaveRoom: LeaveRoom;

describe('LeaveRoom', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createRoom = new CreateRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeRoomsUsersRepository,
    );
    joinRoom = new JoinRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeRoomsUsersRepository,
    );
    leaveRoom = new LeaveRoom(fakeRoomsUsersRepository);
  });

  it('should be able to leave a room', async () => {
    const deleteRoomUser = jest.spyOn(fakeRoomsUsersRepository, 'delete');

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

    await leaveRoom.execute({
      actor: anotherUser,
      room_id: room.id,
    });

    expect(deleteRoomUser).toBeCalledWith(join.id);
  });

  it('should not be able to leave a room if the user are not participating in it', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await createUser.execute({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    const userThatDoesNotParticipate = await createUser.execute({
      nickname: 'Doe Doe',
      password: 'verysecretpassword',
    });

    const room = await createRoom.execute({
      actor: user,
      data: {
        name: 'My friends',
      },
    });

    await joinRoom.execute({
      actor: anotherUser,
      data: {
        room_id: room.id,
      },
    });

    expect(
      leaveRoom.execute({
        actor: userThatDoesNotParticipate,
        room_id: room.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
