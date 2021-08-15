import { EntityRepository, getRepository, Repository } from 'typeorm';

import IMessagesRepository from 'Modules/Messages/Repositories/IMessagesRepository';
import ICreateMessage from 'Modules/Messages/DTOs/ICreateMessage';
import Message from '../Entities/Message';

@EntityRepository(Message)
class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async create(data: ICreateMessage): Promise<Message> {
    const message = this.ormRepository.create(data);
    await this.ormRepository.save(message);
    return message;
  }
}

export default MessagesRepository;
