import UsersContainers from 'Modules/Users/Containers';
import RoomsContainers from 'Modules/Rooms/Containers';
import MessagesContainers from 'Modules/Messages/Containers';
import HashContainers from './Providers/HashProvider';
import TokenContainers from './Providers/TokenProvider';

class Containers {
  public execute(): void {
    const usersContainers = new UsersContainers();
    const roomsContainers = new RoomsContainers();
    const messagesContainers = new MessagesContainers();
    const hashContainers = new HashContainers();
    const tokenContainers = new TokenContainers();

    usersContainers.execute();
    roomsContainers.execute();
    messagesContainers.execute();
    hashContainers.execute();
    tokenContainers.execute();
  }
}

export default Containers;
