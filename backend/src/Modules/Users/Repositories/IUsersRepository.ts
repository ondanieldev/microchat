import User from '../Infra/TypeORM/Entities/User';
import ICreateUser from '../DTOs/ICreateUser';
import IFilterUser from '../DTOs/IFilterUser';

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findOne(data: IFilterUser): Promise<User | undefined>;
}

export default IUsersRepository;
