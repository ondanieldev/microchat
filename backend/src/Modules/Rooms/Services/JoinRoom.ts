import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import ICreateJoin from 'DTOs/ICreateJoin';
import IRoomsRepository from '../Repositories/IRoomsRepository';
import IJoinsRepository from '../Repositories/IJoinsRepository';
import Join from '../Infra/TypeORM/Entities/Join';

interface IRequest {
  actor: User;
  data: Omit<ICreateJoin, 'user_id'>;
}

@injectable()
class JoinRoom {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('JoinsRepository')
    private joinsRepository: IJoinsRepository,
  ) {}

  public async execute({
    actor,
    data: { room_id, ...rest },
  }: IRequest): Promise<Join> {
    const user = await this.usersRepository.findOne({
      id: actor.id,
    });
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    const room = await this.roomsRepository.findOne({
      id: room_id,
    });
    if (!room) {
      throw new AppError('Room not found!', 404);
    }

    return this.joinsRepository.create({
      room_id: room.id,
      user_id: user.id,
      ...rest,
    });
  }
}

export default JoinRoom;
