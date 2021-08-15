import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import KickUser from './KickUser';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let kickUser: KickUser;

describe('KickUser', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();

    kickUser = new KickUser(fakeRoomsRepository, fakeRoomsUsersRepository);
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
});
