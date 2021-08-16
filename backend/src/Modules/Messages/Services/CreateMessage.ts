import { injectable, inject } from 'tsyringe';
import { Server } from 'socket.io';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IRoomsUsersRepository from 'Modules/Rooms/Repositories/IRoomsUsersRepository';
import ICreateMessage from '../DTOs/ICreateMessage';
import Message from '../Infra/TypeORM/Entities/Message';
import IMessagesRepository from '../Repositories/IMessagesRepository';

interface IRequest {
  actor: User;
  data: Omit<ICreateMessage, 'user_id'>;
  sockets: Server;
}

@injectable()
class CreateMessage {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute({ actor, data, sockets }: IRequest): Promise<Message> {
    const roomUser = await this.roomsUsersRepository.findOne({
      room_id: data.room_id,
      user_id: actor.id,
    });
    if (!roomUser) {
      throw new AppError('You are not participating of this room', 403);
    }

    const message = this.messagesRepository.create({
      user_id: actor.id,
      ...data,
    });

    sockets.emit('message', message);

    return message;
  }
}

export default CreateMessage;
