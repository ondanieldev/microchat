import ICreateMessage from '../DTOs/ICreateMessage';
import IFilterMessage from '../DTOs/IFilterMessage';
import IFilterMessages from '../DTOs/IFilterMessages';
import IPaginatedMessages from '../DTOs/IPaginatedMessages';
import Message from '../Infra/TypeORM/Entities/Message';

interface IMessagesRepository {
  create(data: ICreateMessage): Promise<Message>;
  find(data: IFilterMessages): Promise<IPaginatedMessages>;
  findOne(data: IFilterMessage): Promise<Message | undefined>;
}

export default IMessagesRepository;
