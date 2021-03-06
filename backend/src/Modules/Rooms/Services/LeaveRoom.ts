import { inject, injectable } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';

interface IRequest {
  actor: User;
  room_id: string;
}

@injectable()
class LeaveRoom {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ actor, room_id }: IRequest): Promise<void> {
    const roomUser = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!roomUser) {
      throw new AppError('You are not a participant of this room!', 403);
    }

    this.cacheProvider.remove(`rooms-users:${room_id}`);
    this.cacheProvider.remove(`rooms:${actor.id}`);

    await this.roomsUsersRepository.delete(roomUser.id);
  }
}

export default LeaveRoom;
