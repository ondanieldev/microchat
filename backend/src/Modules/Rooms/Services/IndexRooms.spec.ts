import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import FakeCacheProvider from 'Shared/Containers/Providers/CacheProvider/Fakes/FakeCacheProvider';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import IndexRooms from './IndexRooms';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexRooms: IndexRooms;

describe('IndexRooms', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    indexRooms = new IndexRooms(fakeRoomsRepository, fakeCacheProvider);
  });

  it('should be able to index rooms', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });
    await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My enemies',
    });

    const rooms = await indexRooms.execute({});

    expect(rooms.total).toBe(2);
  });

  it('should be able to index rooms from cache', async () => {
    const setCacheData = jest.spyOn(fakeCacheProvider, 'set');

    const user = await fakeUsersRepository.create({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My friends',
    });
    await fakeRoomsRepository.create({
      moderator_id: user.id,
      name: 'My enemies',
    });

    await indexRooms.execute({});
    await indexRooms.execute({});

    expect(setCacheData).toHaveBeenCalledTimes(1);
  });
});
