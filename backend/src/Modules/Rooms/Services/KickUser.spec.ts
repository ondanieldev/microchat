import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import FakeCacheProvider from 'Shared/Containers/Providers/CacheProvider/Fakes/FakeCacheProvider';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import KickUser from './KickUser';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let kickUser: KickUser;

describe('KickUser', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    kickUser = new KickUser(
      fakeRoomsRepository,
      fakeRoomsUsersRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to kick a user out of a room', async () => {
    const deleteRoomUser = jest.spyOn(fakeRoomsUsersRepository, 'delete');

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

    const roomUser = await fakeRoomsUsersRepository.create({
      user_id: anotherUser.id,
      room_id: room.id,
    });

    await kickUser.execute({
      actor: user,
      room_id: room.id,
      user_id: anotherUser.id,
    });

    expect(deleteRoomUser).toBeCalledWith(roomUser.id);
  });

  it('should not be able to kick a user out of a room if you are the user', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
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
      kickUser.execute({
        actor: user,
        room_id: room.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to kick a user out of a room for which you are not a moderator', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await fakeUsersRepository.create({
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

  it('should not be able to kick a user out of a room if you are not participating in it', async () => {
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

    expect(
      kickUser.execute({
        actor: user,
        room_id: room.id,
        user_id: anotherUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to kick a user out of a room if the user is not participating in it', async () => {
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
      kickUser.execute({
        actor: user,
        room_id: room.id,
        user_id: anotherUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to kick a user out of a room if the user does not exist', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
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
      kickUser.execute({
        actor: user,
        room_id: room.id,
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
