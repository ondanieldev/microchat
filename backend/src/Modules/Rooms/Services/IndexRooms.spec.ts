import 'reflect-metadata';

import FakeUsersRepository from 'Modules/Users/Repositories/Fakes/FakeUsersRepository';
import CreateUser from 'Modules/Users/Services/CreateUser';
import FakeHashProvider from 'Shared/Containers/Providers/HashProvider/Fakes/FakeHashProvider';
import FakeRoomsRepository from '../Repositories/Fakes/FakeRoomsRepository';
import FakeRoomsUsersRepository from '../Repositories/Fakes/FakeRoomsUsersRepository';
import CreateRoom from './CreateRoom';
import IndexRooms from './IndexRooms';

let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsUsersRepository: FakeRoomsUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUser;
let createRoom: CreateRoom;
let indexRooms: IndexRooms;

describe('IndexRooms', () => {
  beforeEach(() => {
    fakeRoomsRepository = new FakeRoomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRoomsUsersRepository = new FakeRoomsUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);
    createRoom = new CreateRoom(
      fakeUsersRepository,
      fakeRoomsRepository,
      fakeRoomsUsersRepository,
    );
    indexRooms = new IndexRooms(fakeRoomsRepository);
  });

  it('should be able to index rooms', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      password: 'verysecretpassword',
    });

    await createRoom.execute({
      actor: user,
      data: {
        name: 'My friends',
      },
    });
    await createRoom.execute({
      actor: user,
      data: {
        name: 'My enemies',
      },
    });

    const rooms = await indexRooms.execute({});

    expect(rooms.total).toBe(2);
  });
});
