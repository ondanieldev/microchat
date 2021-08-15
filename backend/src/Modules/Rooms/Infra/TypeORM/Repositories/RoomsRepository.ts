import { EntityRepository, getRepository, Repository } from 'typeorm';

import IRoomsRepository from 'Modules/Rooms/Repositories/IRoomsRepository';
import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import IPaginatedRooms from 'Modules/Rooms/DTOs/IPaginatedRooms';
import IFilterRooms from 'Modules/Rooms/DTOs/IFilterRooms';
import Room from '../Entities/Room';

@EntityRepository(Room)
class RoomsRepository implements IRoomsRepository {
  private ormRepository: Repository<Room>;

  constructor() {
    this.ormRepository = getRepository(Room);
  }

  public async create(data: ICreateRoom): Promise<Room> {
    const room = this.ormRepository.create(data);
    await this.ormRepository.save(room);
    return room;
  }

  public async find({
    limit,
    page,
    ...rest
  }: IFilterRooms): Promise<IPaginatedRooms> {
    const response = await this.ormRepository.findAndCount({
      where: rest,
      take: limit,
      skip: ((page || 1) - 1) * (limit || 0),
    });

    return {
      entities: response[0],
      total: response[1],
    };
  }
}

export default RoomsRepository;
