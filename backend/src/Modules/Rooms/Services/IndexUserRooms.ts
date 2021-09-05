import { inject, injectable } from 'tsyringe';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import ICacheProvider from 'Shared/Containers/Providers/CacheProvider/Models/ICacheProvider';
import IMessagesRepository from 'Modules/Messages/Repositories/IMessagesRepository';
import Message from 'Modules/Messages/Infra/TypeORM/Entities/Message';
import IRoomsUsersRepository from '../Repositories/IRoomsUsersRepository';
import Room from '../Infra/TypeORM/Entities/Room';

interface IResponse extends Room {
  last_message?: Message;
}

@injectable()
class IndexUserRooms {
  constructor(
    @inject('RoomsUsersRepository')
    private roomsUsersRepository: IRoomsUsersRepository,

    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(actor: User): Promise<IResponse[]> {
    const cacheKey = `rooms:${actor.id}`;
    let response = await this.cacheProvider.get<Room[]>(cacheKey);
    if (!response) {
      const roomUsers = await this.roomsUsersRepository.find({
        user_id: actor.id,
      });
      response = roomUsers.map(roomUser => roomUser.room);
      this.cacheProvider.set(cacheKey, response);
    }

    const rooms = [...response] as IResponse[];

    for (const room of rooms) {
      const lastMessage = await this.messagesRepository.findOne({
        room_id: room.id,
      });
      room.last_message = lastMessage;
    }

    rooms.sort((a, b) => {
      const aDate = a.last_message?.created_at.getTime();
      const bDate = b.last_message?.created_at.getTime();

      if (!aDate || !bDate || aDate === bDate) return 0;
      return aDate > bDate ? -1 : 1;
    });

    return rooms;
  }
}

export default IndexUserRooms;
