import ICreateRoom from '../DTOs/ICreateRoom';
import Room from '../Infra/TypeORM/Entities/Room';

interface IRoomsRepository {
  create(data: ICreateRoom): Promise<Room>;
}

export default IRoomsRepository;
