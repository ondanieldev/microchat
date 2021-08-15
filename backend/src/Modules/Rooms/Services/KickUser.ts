import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import IJoinsRepository from '../Repositories/IJoinsRepository';
import IRoomsRepository from '../Repositories/IRoomsRepository';

interface IRequest {
  actor: User;
  room_id: string;
  user_id: string;
}

@injectable()
class KickUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('JoinsRepository')
    private joinsRepository: IJoinsRepository,
  ) {}

  public async execute({ actor, room_id, user_id }: IRequest): Promise<void> {
    const room = await this.roomsRepository.findOne({
      id: room_id,
      moderator_id: actor.id,
    });
    if (!room) {
      throw new AppError('You are not a moderator of this room!', 403);
    }

    const join = await this.joinsRepository.findOne({
      room_id,
      user_id,
    });
    if (!join) {
      throw new AppError('This user does not participate of this room!', 404);
    }

    await this.joinsRepository.delete(join.id);
  }
}

export default KickUser;
