import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import ICreateRoom from '../DTOs/ICreateRoom';
import IRoomsRepository from '../Repositories/IRoomsRepository';
import Room from '../Infra/TypeORM/Entities/Room';

interface IRequest {
  actor: User;
  data: Omit<ICreateRoom, 'moderator_id'>;
}

@injectable()
class CreateRoom {
  constructor(
    @inject('IRoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ actor, data }: IRequest): Promise<Room> {
    const exists = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!exists) {
      throw new AppError('User not found!', 404);
    }

    return this.roomsRepository.create({
      moderator_id: actor.id,
      ...data,
    });
  }
}

export default CreateRoom;
