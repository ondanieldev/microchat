import UsersContainers from 'Modules/Users/Containers';
import RoomsContainers from 'Modules/Rooms/Containers';
import MessagesContainers from 'Modules/Messages/Containers';
import HashContainers from './Providers/HashProvider';
import TokenContainers from './Providers/TokenProvider';
import CacheContainers from './Providers/CacheProvider';

class Containers {
  public execute(): void {
    const usersContainers = new UsersContainers();
    const roomsContainers = new RoomsContainers();
    const messagesContainers = new MessagesContainers();
    const hashContainers = new HashContainers();
    const tokenContainers = new TokenContainers();
    const cacheContainers = new CacheContainers();

    usersContainers.execute();
    roomsContainers.execute();
    messagesContainers.execute();
    hashContainers.execute();
    tokenContainers.execute();
    cacheContainers.execute();
  }
}

export default Containers;
