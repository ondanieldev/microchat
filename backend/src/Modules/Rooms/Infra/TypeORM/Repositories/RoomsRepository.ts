import {
  EntityRepository,
  getRepository,
  Repository,
  Like,
  FindConditions,
} from 'typeorm';

import IRoomsRepository from 'Modules/Rooms/Repositories/IRoomsRepository';
import ICreateRoom from 'Modules/Rooms/DTOs/ICreateRoom';
import IPaginatedRooms from 'Modules/Rooms/DTOs/IPaginatedRooms';
import IFilterRooms from 'Modules/Rooms/DTOs/IFilterRooms';
import IFilterRoom from 'Modules/Rooms/DTOs/IFilterRoom';
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
    const where = { ...rest } as FindConditions<Room>;
    if (where.name) {
      where.name = Like(`%${where.name}%`);
    }

    const response = await this.ormRepository.findAndCount({
      where,
      take: limit,
      skip: ((page || 1) - 1) * (limit || 0),
      order: {
        created_at: 'DESC',
      },
    });

    return {
      entities: response[0],
      total: response[1],
    };
  }

  public async findOne(data: IFilterRoom): Promise<Room | undefined> {
    return this.ormRepository.findOne({
      where: data,
    });
  }
}

export default RoomsRepository;
