import { inject, injectable } from 'tsyringe';

import IRoomsRepository from '../Repositories/IRoomsRepository';
import IFilterRooms from '../DTOs/IFilterRooms';
import IPaginatedRooms from '../DTOs/IPaginatedRooms';

@injectable()
class IndexRooms {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  public async execute(data: IFilterRooms): Promise<IPaginatedRooms> {
    return this.roomsRepository.find(data);
  }
}

export default IndexRooms;
