import { v4 } from 'uuid';

import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import IRoomsRepository from '../IRoomsRepository';

class FakeRoomsRepository implements IRoomsRepository {
  private rooms = [] as Room[];

  public async create(data: ICreateRoom): Promise<Room> {
    const room = new Room();
    Object.assign(room, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.rooms.push(room);
    return room;
  }
}

export default FakeRoomsRepository;
