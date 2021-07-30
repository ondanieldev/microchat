import { v4 } from 'uuid';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import ICreateUser from 'Modules/Users/DTOs/ICreateUser';
import IFilterUser from 'Modules/Users/DTOs/IFilterUser';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUser): Promise<User> {
    const user = new User();
    const assignData = {
      ...data,
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    } as User;
    Object.assign(user, assignData);
    this.users.push(user);
    return user;
  }

  public async findOne(data: IFilterUser): Promise<User | undefined> {
    return this.users.find(user =>
      Object.entries(data).reduce<boolean>(
        // @ts-ignore
        (result, [key, value]) => result && user[key] === value,
        true,
      ),
    );
  }
}

export default FakeUsersRepository;
