import { v4 } from 'uuid';

import Message from 'Modules/Messages/Infra/TypeORM/Entities/Message';
import IFilterMessages from 'Modules/Messages/DTOs/IFilterMessages';
import IPaginatedMessages from 'Modules/Messages/DTOs/IPaginatedMessages';
import FilterEntities from 'Shared/Helpers/FilterEntities';
import IFilterMessage from 'Modules/Messages/DTOs/IFilterMessage';
import ICreateMessage from 'Modules/Messages/DTOs/ICreateMessage';
import IMessagesRepository from '../IMessagesRepository';

class FakeMessagesRepository implements IMessagesRepository {
  private messages = [] as Message[];

  public async create(data: ICreateMessage): Promise<Message> {
    const message = new Message();
    Object.assign(message, data, {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.messages.push(message);
    return message;
  }

  public async find({
    cursor,
    limit,
    ...data
  }: IFilterMessages): Promise<IPaginatedMessages> {
    const filter = new FilterEntities();
    const response = this.messages.filter(message =>
      filter.execute(message, data),
    );

    return {
      entities: response,
      total: response.length,
      next_cursor: null,
    };
  }

  public async findOne(data: IFilterMessage): Promise<Message | undefined> {
    const filter = new FilterEntities();
    return this.messages.find(message => filter.execute(message, data));
  }
}

export default FakeMessagesRepository;
