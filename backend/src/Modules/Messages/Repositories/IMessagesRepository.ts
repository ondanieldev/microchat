import ICreateMessage from '../DTOs/ICreateMessage';
import Message from '../Infra/TypeORM/Entities/Message';

interface IMessagesRepository {
  create(data: ICreateMessage): Promise<Message>;
}

export default IMessagesRepository;
