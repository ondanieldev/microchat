import { EntityRepository, getRepository, Repository } from 'typeorm';

import IJoinsRepository from 'Modules/Rooms/Repositories/IJoinsRepository';
import ICreateJoin from 'DTOs/ICreateJoin';
import Join from '../Entities/Join';

@EntityRepository(Join)
class JoinsRepository implements IJoinsRepository {
  private ormRepository: Repository<Join>;

  constructor() {
    this.ormRepository = getRepository(Join);
  }

  public async create(data: ICreateJoin): Promise<Join> {
    const join = this.ormRepository.create(data);
    await this.ormRepository.save(join);
    return join;
  }
}

export default JoinsRepository;
