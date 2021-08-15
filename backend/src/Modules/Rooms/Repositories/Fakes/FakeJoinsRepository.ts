import { v4 } from 'uuid';

import Join from 'Modules/Rooms/Infra/TypeORM/Entities/Join';
import ICreateJoin from 'DTOs/ICreateJoin';
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
}

export default FakeJoinsRepository;
