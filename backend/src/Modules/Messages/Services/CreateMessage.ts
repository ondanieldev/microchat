import { injectable, inject } from 'tsyringe';

import AppError from 'Shared/Errors/AppError';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import IRoomsUsersRepository from 'Modules/Rooms/Repositories/IRoomsUsersRepository';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import ICreateMessage from '../DTOs/ICreateMessage';
import Message from '../Infra/TypeORM/Entities/Message';
import IMessagesRepository from '../Repositories/IMessagesRepository';

interface IRequest {
  actor: User;
  data: Omit<ICreateMessage, 'user_id'>;
}

@injectable()
class CreateMessage {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ actor, data }: IRequest): Promise<Message> {
    const roomUser = await this.roomsUsersRepository.findOne({
      room_id: data.room_id,
      user_id: actor.id,
    });
    if (!roomUser) {
      throw new AppError('You are not participating of this room', 403);
    }

    const message = await this.messagesRepository.create({
      user_id: actor.id,
      ...data,
    });

    this.cacheProvider.removeByPrefix(`messages:${data.room_id}`);

    return message;
  }
}

export default CreateMessage;
