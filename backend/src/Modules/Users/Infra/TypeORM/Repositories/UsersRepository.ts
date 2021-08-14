import { EntityRepository, getRepository, Repository } from 'typeorm';

import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import ICreateUser from 'Modules/Users/DTOs/ICreateUser';
import IFilterUser from 'Modules/Users/DTOs/IFilterUser';
import User from '../Entities/User';

@EntityRepository()
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUser): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async findOne(data: IFilterUser): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: data,
    });
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export default UsersRepository;
