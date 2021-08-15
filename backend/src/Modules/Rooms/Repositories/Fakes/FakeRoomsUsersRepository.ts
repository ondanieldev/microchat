import { v4 } from 'uuid';

import RoomUser from 'Modules/Rooms/Infra/TypeORM/Entities/RoomUser';
import ICreateRoomUser from 'Modules/Rooms/DTOs/ICreateRoomUser';
import FilterEntities from 'Shared/Helpers/FilterEntities';
import IFilterRoomsUsers from 'Modules/Rooms/DTOs/IFilterRoomsUsers';
import IRoomsUsersRepository from '../IRoomsUsersRepository';

class FakeRoomsUsersRepository implements IRoomsUsersRepository {
  private roomsUsers = [] as RoomUser[];

  public async create(data: ICreateRoomUser): Promise<RoomUser> {
    const roomUser = new RoomUser();
    Object.assign(roomUser, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.roomsUsers.push(roomUser);
    return roomUser;
  }

  public async findOne(data: IFilterRoomsUsers): Promise<RoomUser | undefined> {
    const filter = new FilterEntities();
    return this.roomsUsers.find(roomUser => filter.execute(roomUser, data));
  }

  public async delete(id: string): Promise<void> {
    const index = this.roomsUsers.findIndex(roomUser => roomUser.id === id);
    if (index !== -1) {
      this.roomsUsers.splice(index, 1);
    }
  }
}

export default FakeRoomsUsersRepository;
