import { EntityRepository, getRepository, Repository } from 'typeorm';

import IRoomsUsersRepository from 'Modules/Rooms/Repositories/IRoomsUsersRepository';
import ICreateRoomUser from 'Modules/Rooms/DTOs/ICreateRoomUser';
import IFilterRoomsUsers from 'Modules/Rooms/DTOs/IFilterRoomsUsers';
import RoomUser from '../Entities/RoomUser';

@EntityRepository(RoomUser)
class RoomsUsersRepository implements IRoomsUsersRepository {
  private ormRepository: Repository<RoomUser>;

  constructor() {
    this.ormRepository = getRepository(RoomUser);
  }

  public async create(data: ICreateRoomUser): Promise<RoomUser> {
    const roomUser = this.ormRepository.create(data);
    await this.ormRepository.save(roomUser);
    return roomUser;
  }

  public async findOne(data: IFilterRoomsUsers): Promise<RoomUser | undefined> {
    return this.ormRepository.findOne({
      where: data,
      relations: ['room'],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(data: IFilterRoomsUsers): Promise<RoomUser[]> {
    return this.ormRepository.find({
      where: data,
      relations: ['user'],
    });
  }
}

export default RoomsUsersRepository;
