import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import IndexRooms from './IndexRooms';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let indexRooms: IndexRooms;

describe('IndexRooms', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    indexRooms = new IndexRooms(fakeRoomsRepository);
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
});
