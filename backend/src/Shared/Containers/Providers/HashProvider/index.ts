import { container } from 'tsyringe';

import IHashProvider from './Models/IHashProvider';
import Argon2HashProvider from './Implementations/Argon2HashProvider';
import HashConfig from './Config/HashConfig';

class HashContainers {
  public execute(): void {
    const providers = {
      argon2: Argon2HashProvider,
    };

    container.registerSingleton<IHashProvider>(
      'HashProvider',
      providers[HashConfig.provider],
    );
  }
}

export default HashContainers;
