import UsersContainers from 'Modules/Users/Containers';
import HashContainers from './Providers/HashProvider';
import TokenContainers from './Providers/TokenProvider';

class Containers {
  public execute(): void {
    const usersContainers = new UsersContainers();
    const hashContainers = new HashContainers();
    const tokenContainers = new TokenContainers();

    usersContainers.execute();
    hashContainers.execute();
    tokenContainers.execute();
  }
}

export default Containers;
