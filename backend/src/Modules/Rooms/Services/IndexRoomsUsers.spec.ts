import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import IndexRoomsUsers from './IndexRoomsUsers';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let indexRoomsUsers: IndexRoomsUsers;

describe('IndexRooms', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();

    indexRoomsUsers = new IndexRoomsUsers(fakeRoomsUsersRepository);
  });

  it('should be able to index rooms users', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const anotherUser = await fakeUsersRepository.create({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: anotherUser.id,
    });

    const roomsUsers = await indexRoomsUsers.execute({
      room_id: room.id,
      actor: user,
    });

    expect(roomsUsers).toHaveLength(2);
  });

  it('should be able to index rooms users if you are not participating in it', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const nonParticipatingUser = await fakeUsersRepository.create({
      nickname: 'Jane Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    expect(
      indexRoomsUsers.execute({
        room_id: room.id,
        actor: nonParticipatingUser,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
