import { v4 } from 'uuid';

import Message from 'Modules/Messages/Infra/TypeORM/Entities/Message';
import ICreateRoomUser from 'Modules/Rooms/DTOs/ICreateRoomUser';
import IMessagesRepository from '../IMessagesRepository';

class FakeMessagesRepository implements IMessagesRepository {
  private messages = [] as Message[];

  public async create(data: ICreateRoomUser): Promise<Message> {
    const message = new Message();
    Object.assign(message, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.messages.push(message);
    return message;
  }
}

export default FakeMessagesRepository;
