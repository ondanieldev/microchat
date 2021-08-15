import ICreateRoomUser from '../DTOs/ICreateRoomUser';
import IFilterJoin from '../DTOs/IFilterRoomsUsers';
import RoomUser from '../Infra/TypeORM/Entities/RoomUser';

interface IRoomsUsersRepository {
  create(data: ICreateRoomUser): Promise<RoomUser>;
  findOne(data: IFilterJoin): Promise<RoomUser | undefined>;
  delete(id: string): Promise<void>;
  find(data: IFilterJoin): Promise<RoomUser[]>;
}

export default IRoomsUsersRepository;
