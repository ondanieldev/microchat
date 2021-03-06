import { injectable, inject } from 'tsyringe';
import qs from 'qs';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IRoomsUsersRepository from 'Modules/Rooms/Repositories/IRoomsUsersRepository';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IMessagesRepository from '../Repositories/IMessagesRepository';
import IPaginatedMessages from '../DTOs/IPaginatedMessages';

interface IRequest {
  actor: User;
  room_id: string;
  cursor?: string;
  limit?: number;
}

@injectable()
class IndexMessages {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    actor,
    cursor,
    limit,
    room_id,
  }: IRequest): Promise<IPaginatedMessages> {
    const roomUser = await this.roomsUsersRepository.findOne({
      room_id,
      user_id: actor.id,
    });
    if (!roomUser) {
      throw new AppError('You are not participating of this room', 403);
    }

    let dateCursor = new Date();
    const message = await this.messagesRepository.findOne({
      id: cursor,
    });
    if (message) {
      dateCursor = new Date(message.created_at);
    }

    const cacheKey = `messages:${room_id}:${qs.stringify({ cursor, limit })}`;
    let data = await this.cacheProvider.get<IPaginatedMessages>(cacheKey);
    if (!data) {
      data = await this.messagesRepository.find({
        room_id,
        limit,
        cursor: dateCursor,
      });
      this.cacheProvider.set(cacheKey, data);
    }

    return data;
  }
}

export default IndexMessages;
