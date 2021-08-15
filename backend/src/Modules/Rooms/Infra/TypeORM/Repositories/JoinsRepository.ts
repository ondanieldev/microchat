import { EntityRepository, getRepository, Repository } from 'typeorm';

import IJoinsRepository from 'Modules/Rooms/Repositories/IJoinsRepository';
import ICreateJoin from 'DTOs/ICreateJoin';
import IFilterJoin from 'Modules/Rooms/DTOs/IFilterJoin';
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

  public async findOne(data: IFilterJoin): Promise<Join | undefined> {
    return this.ormRepository.findOne({
      where: data,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default JoinsRepository;
