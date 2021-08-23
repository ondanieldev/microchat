import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IRoomsUsersRepository from 'Modules/Rooms/Repositories/IRoomsUsersRepository';
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

    return this.messagesRepository.find({
      room_id,
      limit,
      cursor: dateCursor,
    });
  }
}

export default IndexMessages;
