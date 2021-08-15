import ICreateJoin from 'DTOs/ICreateJoin';
import IFilterJoin from '../DTOs/IFilterJoin';
import Join from '../Infra/TypeORM/Entities/Join';

interface IJoinsRepository {
  create(data: ICreateJoin): Promise<Join>;
  findOne(data: IFilterJoin): Promise<Join | undefined>;
  delete(id: string): Promise<void>;
}

export default IJoinsRepository;
