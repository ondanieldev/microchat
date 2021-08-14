import ICreateRoom from '../DTOs/ICreateRoom';
import IFilterRooms from '../DTOs/IFilterRooms';
import IPaginatedRooms from '../DTOs/IPaginatedRooms';
import Room from '../Infra/TypeORM/Entities/Room';

interface IRoomsRepository {
  create(data: ICreateRoom): Promise<Room>;
  find(data: IFilterRooms): Promise<IPaginatedRooms>;
}

export default IRoomsRepository;
