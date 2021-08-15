import { v4 } from 'uuid';

import Join from 'Modules/Rooms/Infra/TypeORM/Entities/Join';
import ICreateJoin from 'DTOs/ICreateJoin';
import FilterEntities from 'Shared/Helpers/FilterEntities';
import IFilterJoin from 'Modules/Rooms/DTOs/IFilterJoin';
import IJoinsRepository from '../IJoinsRepository';

class FakeJoinsRepository implements IJoinsRepository {
  private joins = [] as Join[];

  public async create(data: ICreateJoin): Promise<Join> {
    const join = new Join();
    Object.assign(join, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.joins.push(join);
    return join;
  }

  public async findOne(data: IFilterJoin): Promise<Join | undefined> {
    const filter = new FilterEntities();
    return this.joins.find(join => filter.execute(join, data));
  }

  public async delete(id: string): Promise<void> {
    const index = this.joins.findIndex(join => join.id === id);
    if (index !== -1) {
      this.joins.splice(index, 1);
    }
  }
}

export default FakeJoinsRepository;
