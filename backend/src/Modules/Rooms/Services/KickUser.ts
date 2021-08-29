import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IUsersRepository from 'Modules/Users/Repositories/IUsersRepository';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';
import IRoomsRepository from '../Repositories/IRoomsRepository';

interface IRequest {
  actor: User;
  room_id: string;
  user_id: string;
}

@injectable()
class KickUser {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,

    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ actor, room_id, user_id }: IRequest): Promise<User> {
    if (actor.id === user_id) {
      throw new AppError(
        'You cannot kick yourself! If you want to leave the room, use the "leave room service" instead.',
      );
    }

    const room = await this.roomsRepository.findOne({
      id: room_id,
      moderator_id: actor.id,
    });
    if (!room) {
      throw new AppError('You are not a moderator of this room!', 403);
    }

    const moderatorIsJoined = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!moderatorIsJoined) {
      throw new AppError('You are not participating of this room!', 403);
    }

    const user = await this.usersRepository.findOne({
      id: user_id,
    });
    if (!user) {
      throw new AppError('This user does not exist!', 404);
    }

    const roomUser = await this.roomsUsersRepository.findOne({
      room_id,
      user_id,
    });
    if (!roomUser) {
      throw new AppError('This user does not participate of this room!', 404);
    }

    await this.roomsUsersRepository.delete(roomUser.id);

    this.cacheProvider.remove(`rooms-users:${room.id}`);
    this.cacheProvider.removeByPrefix(`rooms:${user.id}`);

    return user;
  }
}

export default KickUser;
