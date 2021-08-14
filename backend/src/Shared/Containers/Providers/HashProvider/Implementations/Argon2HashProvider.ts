import { hash, verify } from 'argon2';

import IHashProvider from '../Models/IHashProvider';

class Argon2HashProvider implements IHashProvider {
  public async generate(data: string): Promise<string> {
    return hash(data);
  }

  public async compare(data: string, hashedData: string): Promise<boolean> {
    return verify(hashedData, data);
  }
}

export default Argon2HashProvider;
