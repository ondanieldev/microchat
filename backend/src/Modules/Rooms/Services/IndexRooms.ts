import { inject, injectable } from 'tsyringe';
import qs from 'qs';

import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IRoomsRepository from '../Repositories/IRoomsRepository';
import IFilterRooms from '../DTOs/IFilterRooms';
import IPaginatedRooms from '../DTOs/IPaginatedRooms';

@injectable()
class IndexRooms {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: IFilterRooms): Promise<IPaginatedRooms> {
    const cacheKey = `rooms:${qs.stringify(data)}`;
    let response = await this.cacheProvider.get<IPaginatedRooms>(cacheKey);
    if (!response) {
      response = await this.roomsRepository.find(data);
      this.cacheProvider.set(cacheKey, response);
    }

    return response;
  }
}

export default IndexRooms;
