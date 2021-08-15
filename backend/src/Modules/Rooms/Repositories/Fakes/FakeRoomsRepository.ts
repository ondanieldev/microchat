import { v4 } from 'uuid';

import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import IPaginatedRooms from 'Modules/Rooms/DTOs/IPaginatedRooms';
import IFilterRooms from 'Modules/Rooms/DTOs/IFilterRooms';
import IFilterRoom from 'Modules/Rooms/DTOs/IFilterRoom';
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
    const response = this.rooms.filter(room => this.filter(room, data));

    return {
      entities: response,
      total: response.length,
    };
  }

  public async findOne(data: IFilterRoom): Promise<Room | undefined> {
    return this.rooms.find(room => this.filter(room, data));
  }

  private filter(room: Room, data: IFilterRoom | IFilterRooms): boolean {
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
  }
}

export default FakeRoomsRepository;
