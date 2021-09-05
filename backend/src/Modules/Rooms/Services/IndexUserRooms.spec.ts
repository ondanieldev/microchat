/* eslint-disable max-classes-per-file */

import 'reflect-metadata';

import FakeCacheProvider from 'Shared/Containers/Providers/CacheProvider/Fakes/FakeCacheProvider';
import FakeMessagesRepository from 'Modules/Messages/Repositories/Fakes/FakeMessagesRepository';
import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import IMessageType from 'Modules/Messages/DTOs/IMessageType';
import { addDays, subDays } from 'date-fns';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import IndexUserRooms from './IndexUserRooms';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';

let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeMessagesRepository: FakeMessagesRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;
let indexUserRooms: IndexUserRooms;

describe('IndexUserRooms', () => {
  beforeEach(() => {
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeMessagesRepository = new FakeMessagesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsRepository = new FakeRoomsRepository();

    indexUserRooms = new IndexUserRooms(
      fakeRoomsUsersRepository,
      fakeMessagesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to index user rooms', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    const anotherRoom = await fakeRoomsRepository.create({
      name: 'My enemies',
      moderator_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: anotherRoom.id,
      user_id: user.id,
    });

    const userRooms = await indexUserRooms.execute(user);

    expect(userRooms).toHaveLength(2);
  });

  it('should be able to index user rooms from cache', async () => {
    const setCacheData = jest.spyOn(fakeCacheProvider, 'set');

    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    const anotherRoom = await fakeRoomsRepository.create({
      name: 'My enemies',
      moderator_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: anotherRoom.id,
      user_id: user.id,
    });

    await indexUserRooms.execute(user);
    await indexUserRooms.execute(user);

    expect(setCacheData).toHaveBeenCalledTimes(1);
  });

  it('should be able to index user rooms and sort them by last message timestamp', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    const room = await fakeRoomsRepository.create({
      name: 'My friends',
      moderator_id: user.id,
    });

    const anotherRoom = await fakeRoomsRepository.create({
      name: 'My enemies',
      moderator_id: user.id,
    });

    const anotherOneRoom = await fakeRoomsRepository.create({
      name: 'My family',
      moderator_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: room.id,
      user_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: anotherRoom.id,
      user_id: user.id,
    });

    await fakeRoomsUsersRepository.create({
      room_id: anotherOneRoom.id,
      user_id: user.id,
    });

    await fakeMessagesRepository.create({
      content: 'hi friends',
      room_id: room.id,
      type: IMessageType.text,
      user_id: user.id,
    });

    jest.useFakeTimers('modern').setSystemTime(addDays(new Date(), 1));
    await fakeMessagesRepository.create({
      content: 'hi enemies',
      room_id: anotherRoom.id,
      type: IMessageType.text,
      user_id: user.id,
    });

    jest.useFakeTimers('modern').setSystemTime(subDays(new Date(), 2));
    await fakeMessagesRepository.create({
      content: 'hi family',
      room_id: anotherOneRoom.id,
      type: IMessageType.text,
      user_id: user.id,
    });

    const userRooms = await indexUserRooms.execute(user);

    expect(userRooms[0].id).toBe(anotherRoom.id);
    expect(userRooms[2].id).toBe(anotherOneRoom.id);
  });
});
