import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import AppError from 'Shared/Errors/AppError';
import FakeCacheProvider from 'Shared/Containers/Providers/CacheProvider/Fakes/FakeCacheProvider';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import LeaveRoom from './LeaveRoom';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let leaveRoom: LeaveRoom;

describe('LeaveRoom', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    leaveRoom = new LeaveRoom(fakeRoomsUsersRepository, fakeCacheProvider);
  });

  it('should be able to leave a room', async () => {
    const deleteRoomUser = jest.spyOn(fakeRoomsUsersRepository, 'delete');

    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });

    const roomUser = await fakeRoomsUsersRepository.create({
      user_id: user.id,
      room_id: room.id,
    });

    await leaveRoom.execute({
      actor: user,
      room_id: room.id,
    });

    expect(deleteRoomUser).toBeCalledWith(roomUser.id);
  });

  it('should not be able to leave a room if the user are not participating in it', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await fakeUsersRepository.create({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });

    await fakeRoomsUsersRepository.create({
      user_id: user.id,
      room_id: room.id,
    });

    expect(
      leaveRoom.execute({
        actor: anotherUser,
        room_id: room.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
