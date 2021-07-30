import UsersContainers from 'Modules/Users/Containers';
import HashContainers from './Providers/HashProvider';

class Containers {
  public execute(): void {
    const usersContainers = new UsersContainers();
    const hashContainers = new HashContainers();

    usersContainers.execute();
    hashContainers.execute();
  }
}

export default Containers;
