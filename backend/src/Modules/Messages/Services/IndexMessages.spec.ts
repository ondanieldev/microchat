import 'reflect-metadata';

import AppError from 'Shared/Errors/AppError';
import FakeRoomsUsersRepository from 'Modules/Rooms/Repositories/Fakes/FakeRoomsUsersRepository';
import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import FakeRoomsRepository from 'Modules/Rooms/Repositories/Fakes/FakeRoomsRepository';
import FakeMessagesRepository from '../Repositories/Fakes/FakeMessagesRepository';
import IndexMessages from './IndexMessages';
import IMessageType from '../DTOs/IMessageType';

let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeMessagesRepository: FakeMessagesRepository;
let indexMessages: IndexMessages;

describe('IndexMessages', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeMessagesRepository = new FakeMessagesRepository();

    indexMessages = new IndexMessages(
      fakeRoomsUsersRepository,
      fakeMessagesRepository,
    );
  });

  it('should be able to index room messages', async () => {
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

    await fakeMessagesRepository.create({
      room_id: room.id,
      user_id: user.id,
      content: 'Hello, everyone!',
      type: IMessageType.text,
    });

    await fakeMessagesRepository.create({
      room_id: room.id,
      user_id: user.id,
      content: 'How is it going?',
      type: IMessageType.text,
    });

    const messages = await indexMessages.execute({
      actor: user,
      room_id: room.id,
    });

    expect(messages.total).toBe(2);
  });

  it('should be able to index room messages using cursor', async () => {
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

    await fakeMessagesRepository.create({
      room_id: room.id,
      user_id: user.id,
      content: 'Hello, everyone!',
      type: IMessageType.text,
    });

    const message = await fakeMessagesRepository.create({
      room_id: room.id,
      user_id: user.id,
      content: 'How is it going?',
      type: IMessageType.text,
    });

    const messages = await indexMessages.execute({
      actor: user,
      room_id: room.id,
      cursor: message.id,
    });

    expect(messages.total).toBe(2);
  });

  it('should not be able to index room messages if the user is not participating in it', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    expect(
      indexMessages.execute({
        actor: user,
        room_id: room.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
