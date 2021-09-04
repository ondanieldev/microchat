import { inject, injectable } from 'tsyringe';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import AppError from 'Shared/Errors/AppError';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';

interface IRequest {
  actor: User;
  room_id: string;
}

@injectable()
class IndexRoomsUsers {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ actor, room_id }: IRequest): Promise<User[]> {
    const userIsParticipant = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!userIsParticipant) {
      throw new AppError('You are not a participant of this room!', 403);
    }

    const cacheKey = `rooms-users:${room_id}`;
    let response = await this.cacheProvider.get<User[]>(cacheKey);
    if (!response) {
      const roomUsers = await this.roomsUsersRepository.find({
        room_id,
      });
      response = roomUsers.map(room => room.user);
      this.cacheProvider.set(cacheKey, response);
    }

    return response;
  }
}

export default IndexRoomsUsers;
