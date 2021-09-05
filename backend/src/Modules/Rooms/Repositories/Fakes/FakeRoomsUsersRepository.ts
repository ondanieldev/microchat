import { v4 } from 'uuid';

import RoomUser from 'Modules/Rooms/Infra/TypeORM/Entities/RoomUser';
import ICreateRoomUser from 'Modules/Rooms/DTOs/ICreateRoomUser';
import FilterEntities from 'Shared/Helpers/FilterEntities';
import IFilterRoomsUsers from 'Modules/Rooms/DTOs/IFilterRoomsUsers';
import Room from 'Modules/Rooms/Infra/TypeORM/Entities/Room';
import IRoomsUsersRepository from '../IRoomsUsersRepository';

class FakeRoomsUsersRepository implements IRoomsUsersRepository {
  private roomsUsers = [] as RoomUser[];

  public async create(data: ICreateRoomUser): Promise<RoomUser> {
    const roomUser = new RoomUser();
    const room = new Room();
    room.id = data.room_id;
    Object.assign(roomUser, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
      room,
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

  public async find(data: IFilterRoomsUsers): Promise<RoomUser[]> {
    const filter = new FilterEntities();
    return this.roomsUsers.filter(roomUser => filter.execute(roomUser, data));
  }
}

export default FakeRoomsUsersRepository;
