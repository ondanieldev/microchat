import UsersContainers from 'Modules/Users/Containers';
import RoomsContainers from 'Modules/Rooms/Containers';
import HashContainers from './Providers/HashProvider';
import TokenContainers from './Providers/TokenProvider';

class Containers {
  public execute(): void {
    const usersContainers = new UsersContainers();
    const roomsContainers = new RoomsContainers();
    const hashContainers = new HashContainers();
    const tokenContainers = new TokenContainers();

    usersContainers.execute();
    roomsContainers.execute();
    hashContainers.execute();
    tokenContainers.execute();
  }
}

export default Containers;
