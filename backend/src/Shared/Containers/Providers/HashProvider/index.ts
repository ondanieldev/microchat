import { container } from 'tsyringe';

import IHashProvider from './Models/IHashProvider';
import Argon2HashProvider from './Implementations/Argon2HashProvider';

class HashContainers {
  public execute(): void {
    container.registerSingleton<IHashProvider>(
      'HashProvider',
      Argon2HashProvider,
    );
  }
}

export default HashContainers;
