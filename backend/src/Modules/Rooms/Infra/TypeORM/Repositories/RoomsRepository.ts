import { EntityRepository, Repository } from 'typeorm';

import IRoomsRepository from 'Modules/Rooms/Repositories/IRoomsRepository';
import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import Room from '../Entities/Room';

@EntityRepository(Room)
class RoomsRepository implements IRoomsRepository {
  private ormRepository: Repository<Room>;

  public async create(data: ICreateRoom): Promise<Room> {
    const room = this.ormRepository.create(data);
    await this.ormRepository.save(room);
    return room;
  }
}

export default RoomsRepository;
