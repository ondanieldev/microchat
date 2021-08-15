import ICreateJoin from 'DTOs/ICreateJoin';
import Join from '../Infra/TypeORM/Entities/Join';

interface IJoinsRepository {
  create(data: ICreateJoin): Promise<Join>;
}

export default IJoinsRepository;
