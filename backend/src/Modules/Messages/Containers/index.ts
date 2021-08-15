import { container } from 'tsyringe';

import IMessagesRepository from '../Repositories/IMessagesRepository';
import MessagesRepository from '../Infra/TypeORM/Repositories/MessagesRepository';

class MessagesContainers {
  public execute(): void {
    container.registerSingleton<IMessagesRepository>(
      'MessagesRepository',
      MessagesRepository,
    );
  }
}

export default MessagesContainers;
