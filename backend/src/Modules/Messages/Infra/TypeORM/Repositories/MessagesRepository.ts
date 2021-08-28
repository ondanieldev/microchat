import { EntityRepository, getRepository, LessThan, Repository } from 'typeorm';

import IMessagesRepository from 'Modules/Messages/Repositories/IMessagesRepository';
import ICreateMessage from 'Modules/Messages/DTOs/ICreateMessage';
import IFilterMessages from 'Modules/Messages/DTOs/IFilterMessages';
import IPaginatedMessages from 'Modules/Messages/DTOs/IPaginatedMessages';
import IFilterMessage from 'Modules/Messages/DTOs/IFilterMessage';
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

  public async find({
    limit,
    cursor,
    ...data
  }: IFilterMessages): Promise<IPaginatedMessages> {
    const total = await this.ormRepository.count();
    const response = await this.ormRepository.findAndCount({
      where: {
        ...data,
        created_at: LessThan(cursor || new Date()),
      },
      take: limit,
      order: {
        created_at: 'DESC',
      },
      relations: ['user'],
    });

    const entities = response[0];
    const available = response[1];
    let next_cursor = null;
    if (entities.length < available) {
      const lastIndex = entities.length - 1;
      next_cursor = entities[lastIndex].id;
    }

    return {
      entities,
      next_cursor,
      total,
    };
  }

  public async findOne(data: IFilterMessage): Promise<Message | undefined> {
    return this.ormRepository.findOne({
      where: data,
      order: {
        created_at: 'DESC',
      },
    });
  }
}

export default MessagesRepository;
