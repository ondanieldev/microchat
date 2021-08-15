import { v4 } from 'uuid';

import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import IPaginatedRooms from 'Modules/Rooms/DTOs/IPaginatedRooms';
import IFilterRooms from 'Modules/Rooms/DTOs/IFilterRooms';
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

  public async find(data: IFilterRooms): Promise<IPaginatedRooms> {
    const response = this.rooms.filter(room => {
      let match = true;
      Object.entries(data).forEach(([key, value]) => {
        if (
          // @ts-ignore
          room[key] !== value
        ) {
          match = false;
        }
      });
      return match;
    });

    return {
      entities: response,
      total: response.length,
    };
  }
}

export default FakeRoomsRepository;
