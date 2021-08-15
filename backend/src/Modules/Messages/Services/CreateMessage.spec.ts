import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeRoomsUsersRepository from 'Modules/Rooms/Repositories/Fakes/FakeRoomsUsersRepository';
import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import FakeRoomsRepository from 'Modules/Rooms/Repositories/Fakes/FakeRoomsRepository';
import CreateMessage from './CreateMessage';
import FakeMessagesRepository from '../Repositories/Fakes/FakeMessagesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeMessagesRepository: FakeMessagesRepository;
let createMessage: CreateMessage;

describe('CreateMessage', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeMessagesRepository = new FakeMessagesRepository();

    createMessage = new CreateMessage(
      fakeRoomsUsersRepository,
      fakeMessagesRepository,
    );
  });

  it('should be able to send a message', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
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

    const message = await createMessage.execute({
      actor: user,
      data: {
        content: 'Hello, everyone!',
        room_id: room.id,
      },
    });

    expect(message).toHaveProperty('id');
  });

  it('should not be able to send a message if the user is not in the room', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    expect(
      createMessage.execute({
        actor: user,
        data: {
          content: 'I cannot send this message!',
          room_id: room.id,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
