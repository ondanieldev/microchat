import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import AppError from 'Shared/Errors/AppError';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import JoinRoom from './JoinRoom';
import Room from '../Infra/TypeORM/Entities/Room';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let joinRoom: JoinRoom;

describe('JoinRoom', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();

    joinRoom = new JoinRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeRoomsUsersRepository,
    );
  });

  it('should be able to join a room', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });

    const roomUser = await joinRoom.execute({
      actor: user,
      data: {
        room_id: room.id,
      },
    });

    expect(roomUser.user_id).toBe(user.id);
    expect(roomUser.room_id).toBe(room.id);
  });

  it('should not be able to join a room if the user does not exist', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
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

  it('should not be able to join a non-existing room', async () => {
    const user = await fakeUsersRepository.create({
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

  it('should not be able to join a room if you are already a participant in it', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    await expect(
      joinRoom.execute({
        actor: user,
        data: {
          room_id: room.id,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
