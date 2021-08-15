import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import CreateUser from 'Modules/Users/Services/CreateUser';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeJoinsRepository from '../Repositories/Fakes/FakeJoinsRepository';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import LeaveRoom from './LeaveRoom';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;
let joinRoom: JoinRoom;
let leaveRoom: LeaveRoom;

describe('LeaveRoom', () => {
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
    leaveRoom = new LeaveRoom(fakeJoinsRepository);
  });

  it('should be able to leave the room', async () => {
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

    await leaveRoom.execute({
      actor: anotherUser,
      id: join.id,
    });

    expect(deleteJoin).toBeCalledWith(join.id);
  });

  it('should not be able to leave a room that the user does not participate', async () => {
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

    const join = await joinRoom.execute({
      actor: anotherUser,
      data: {
        room_id: room.id,
      },
    });

    expect(
      leaveRoom.execute({
        actor: userThatDoesNotParticipate,
        id: join.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
